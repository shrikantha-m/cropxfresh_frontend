import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { AuthService } from '../../../core/services/auth.service';

interface Notification {
  id: string;
  icon: string;
  message: string;
  read: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('notificationMenu') notificationMenu!: MatMenu;
  isLoggedIn = false;
  isMobileMenuOpen = false;
  isMobileView = false;
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

  private authSubscription: any;

  constructor(private authService: AuthService) {
    this.checkScreenSize();
    // Check if user is already logged in from stored token
    const hasToken = !!localStorage.getItem('access_token');
    if (hasToken) {
      this.isLoggedIn = true;
      this.loadNotifications();
    }

    // Subscribe to auth state changes
    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      (isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
        if (isLoggedIn) {
          this.loadNotifications();
        } else {
          this.isMobileMenuOpen = false;
          this.notifications = [];
        }
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    this.isMobileView = window.innerWidth < 1024; // Use lg breakpoint (1024px)
    if (!this.isMobileView && this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Prevent body scroll when mobile menu is open
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
  }

  markNotificationAsRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  ngOnInit(): void {
    // Initial load of notifications if user is already logged in
    if (this.isLoggedIn) {
      this.loadNotifications();
    }
  }

  private loadNotifications(): void {
    // You can load notifications from a service here
    this.notifications = [
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
  }

  ngOnDestroy(): void {
    // Clean up subscription to prevent memory leaks
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
