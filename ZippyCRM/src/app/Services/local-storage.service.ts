import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private inactivityTimeout: any;
  private inactivityDuration = 60 * 60 * 1000; // 1 hour in milliseconds

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.resetInactivityTimer(); // Start the inactivity timer only in the browser
      this.trackUserActivity();
    }
  }

  // Function to clear localStorage
  clearLocalStorage(): void {
    localStorage.clear();
    console.log('localStorage has been cleared due to inactivity.');
  }

  // Function to reset inactivity timer
  resetInactivityTimer(): void {
    clearTimeout(this.inactivityTimeout);
    this.inactivityTimeout = setTimeout(
      () => this.clearLocalStorage(),
      this.inactivityDuration
    );
  }

  // Function to track user activity
  private trackUserActivity(): void {
    // Listen for user events that will reset the inactivity timer
    window.addEventListener('click', () => this.resetInactivityTimer());
    window.addEventListener('keypress', () => this.resetInactivityTimer());
    window.addEventListener('mousemove', () => this.resetInactivityTimer());
    window.addEventListener('scroll', () => this.resetInactivityTimer());
  }
}
