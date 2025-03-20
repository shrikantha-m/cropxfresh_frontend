import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

interface Notification {
  id: string;
  icon: string;
  message: string;
  read: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  notifications: Notification[] = [
    { 
      id: '1',
      icon: 'info', 
      message: 'Welcome to CropXFresh!',
      read: false,
      timestamp: new Date()
    },
    { 
      id: '2',
      icon: 'notifications', 
      message: 'You have a new order request.',
      read: false,
      timestamp: new Date()
    }
  ];

  get notificationCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Component initialization logic if needed
  }

  logout(): void {
    this.authService.logout();
  }
}
