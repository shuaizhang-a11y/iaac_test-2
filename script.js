// Small JS for UI interactions: subscribe form + simple behaviors
document.addEventListener('DOMContentLoaded', function(){
  const subscribe = document.getElementById('subscribe');
  if(subscribe){
    subscribe.addEventListener('submit', function(e){
      e.preventDefault();
      const email = document.getElementById('email');
      if(!email || !email.value) return alert('Please enter your email.');
      // Basic client-side validation
      const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if(!re.test(email.value)) return alert('Please enter a valid email address.');
      // Replace with real submission logic later
      alert('Thanks — you\'re subscribed!');
      subscribe.reset();
    });
  }
});
