import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { Transaction, TransactionService } from 'src/app/core/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  transactions: Transaction[] = [];
  balance = 0;
  totalCredit = 0;
  totalDebit = 0;

  constructor(
    private txService: TransactionService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
