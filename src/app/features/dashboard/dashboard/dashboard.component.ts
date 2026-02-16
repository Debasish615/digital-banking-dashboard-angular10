import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { Transaction, TransactionService } from 'src/app/core/transaction.service';

type TxTypeFilter = 'All' | 'Credit' | 'Debit';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // data
  transactions: Transaction[] = [];

  // ui state
  search = '';
  typeFilter: TxTypeFilter = 'All';

  // summary
  balance = 0;
  totalCredit = 0;
  totalDebit = 0;

  // (optional) show user
  username = 'User';

  constructor(
    private txService: TransactionService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // try to show last login user if you want (optional)
    // if you saved username to localStorage during login, read it here
    this.username = this.auth.getUsername();


    this.txService.getTransactions().subscribe((data) => {
      this.transactions = data;

      this.totalCredit = data
        .filter((t) => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

      this.totalDebit = data
        .filter((t) => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

      this.balance = this.totalCredit - this.totalDebit;
    });
  }

  get filteredTransactions(): Transaction[] {
    const q = this.search.trim().toLowerCase();

    return this.transactions.filter((t) => {
      const matchesText =
        !q ||
        String(t.id).toLowerCase().includes(q) ||
        (t.description || '').toLowerCase().includes(q) ||
        (t.date || '').toLowerCase().includes(q);

      const matchesType =
        this.typeFilter === 'All' ||
        (this.typeFilter === 'Credit' && t.amount >= 0) ||
        (this.typeFilter === 'Debit' && t.amount < 0);

      return matchesText && matchesType;
    });
  }

  setFilter(type: TxTypeFilter): void {
    this.typeFilter = type;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
