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
  const emailBtn = document.getElementById('email-open');
  if(emailBtn){
    emailBtn.addEventListener('click', function(){
      window.location.href = 'mailto:shuai.zhang@students.iaac.net';
    });
  }

  // Lightbox: click gallery images to open full-size overlay with navigation
  const galleryImgs = document.querySelectorAll('.gallery img');
  if(galleryImgs.length){
    // collect sources and alts
    const imgSrcs = [];
    const imgAlts = [];
    galleryImgs.forEach(function(el, idx){
      imgSrcs.push(el.src);
      imgAlts.push(el.alt || '');
      el.dataset.lbIndex = idx;
    });

    // create overlay elements
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role','dialog');
    overlay.setAttribute('aria-hidden','true');

    const img = document.createElement('img');
    overlay.appendChild(img);

    // create nav container and buttons
    const nav = document.createElement('div');
    nav.className = 'lightbox-nav';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-prev';
    prevBtn.setAttribute('aria-label','Previous image');
    prevBtn.innerText = '‹';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-next';
    nextBtn.setAttribute('aria-label','Next image');
    nextBtn.innerText = '›';

    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerText = 'Close';

    document.body.appendChild(overlay);
    document.body.appendChild(nav);
    document.body.appendChild(closeBtn);

    let currentIndex = -1;

    function showIndex(i){
      if(imgSrcs.length === 0) return;
      // wrap-around
      if(i < 0) i = imgSrcs.length - 1;
      if(i >= imgSrcs.length) i = 0;
      currentIndex = i;
      img.src = imgSrcs[currentIndex];
      img.alt = imgAlts[currentIndex] || '';
      overlay.classList.add('visible');
      overlay.setAttribute('aria-hidden','false');
      closeBtn.style.display = 'block';
      // focus close for accessibility
      closeBtn.focus();
    }

    function closeLightbox(){
      overlay.classList.remove('visible');
      overlay.setAttribute('aria-hidden','true');
      closeBtn.style.display = 'none';
      img.src = '';
    }

    galleryImgs.forEach(function(el){
      el.style.cursor = 'zoom-in';
      el.addEventListener('click', function(){
        const idx = parseInt(el.dataset.lbIndex, 10) || 0;
        showIndex(idx);
      });
    });

    prevBtn.addEventListener('click', function(e){
      e.stopPropagation();
      showIndex(currentIndex - 1);
    });
    nextBtn.addEventListener('click', function(e){
      e.stopPropagation();
      showIndex(currentIndex + 1);
    });

    overlay.addEventListener('click', function(e){
      if(e.target === overlay) closeLightbox();
    });
    closeBtn.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') return closeLightbox();
      if(e.key === 'ArrowLeft') return showIndex(currentIndex - 1);
      if(e.key === 'ArrowRight') return showIndex(currentIndex + 1);
    });
  }
});
