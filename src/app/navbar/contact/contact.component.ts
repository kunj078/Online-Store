import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent {
  constructor(private router: Router) {}

  // This method will be triggered when the form is submitted
  onSubmit() {
    console.log("Before submit.....");

    // Confirm dialog before form submission
    const userConfirmed = window.confirm('Are you sure you want to submit the form?');

    if (userConfirmed) {
      // Simulate form submission logic here
      alert('Form submitted successfully!');

      // Redirect to the home page
      this.router.navigate(['/']);
    } else {
      // If the user cancels the submission
      alert('Form submission canceled.');
    }
  }
}
