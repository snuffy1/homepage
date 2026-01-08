// Initialize Lenis (Smooth Scroll)
const lenis = new Lenis();
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);

// Elements
const heroSection = document.querySelector('#hero-section');
const heroFrame = document.querySelector('#hero-frame');
const heroVideo = document.querySelector('#hero-video');
const mainHeader = document.querySelector('#main-header');
const floatingContact = document.querySelector('#floating-contact');
const menuBtn = document.querySelector('#menu-toggle');
const menuClose = document.querySelector('#menu-close');
const fullMenu = document.querySelector('#full-menu');
const image = document.querySelector('#image');
const first = document.querySelector('#first');
const second = document.querySelector('#second');
const third = document.querySelector('#third');
const four = document.querySelector('#four');
const mail = document.querySelector('#mail');


// Landing Page Animation (Scale down and Fade Header)
const isMobile = window.innerWidth < 768;
const scrollEnd = isMobile ? "+=700" : "+=1200";

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: scrollEnd,
        scrub: 1,
        pin: true,
        anticipatePin: 1
    }
});

//  Fade Navbar
tl.to(mainHeader, {
    autoAlpha: 0,
    y: -12,
    ease: "none",
}, 0);

// Play video on scroll start
tl.call(() => {
    heroVideo.play().catch(() => {});
}, [], 0.1);

// Scale down video frame
tl.to(heroFrame, {
    scale: 0.78,
    duration: 2,
    ease: "none"
}, 0.2);

//  Scroll Logic (Navbar Hide & Floating Button)
window.addEventListener('scroll', () => {
    const isScrolled = window.scrollY > 500;

    if (isScrolled) {
        floatingContact.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
        floatingContact.classList.add('opacity-100', 'translate-y-0');
    } else {
        floatingContact.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
        floatingContact.classList.remove('opacity-100', 'translate-y-0');
    }

    if (isScrolled) {
        mainHeader.classList.add('opacity-0', '-translate-y-full', 'pointer-events-none');
        mainHeader.classList.remove('opacity-100', 'translate-y-0');
    } else {
        if (window.scrollY < 100) {
            mainHeader.classList.remove('opacity-0', '-translate-y-full', 'pointer-events-none');
            mainHeader.classList.add('opacity-100', 'translate-y-0');
        }
    }
});

menuBtn.addEventListener('click', () => {
  const tl = gsap.timeline();

  // 1. Full menu slides in
  tl.to(fullMenu, {
    y: '0%',
    ease: 'power2.out',
    duration: 0.4
  });

  // 2. Image slides in after fullMenu finishes
  tl.fromTo(image, {
    y: '100%',
    opacity: 0,
  }, {
    y: '0%',
    ease: 'power2.out',
    opacity: 1,
    duration: 0.3
  });

  // 3. Items slide in one after another
   tl.fromTo(first, {
    y: '100%',
    opacity: 0,
  }, {
    y: '0%',
    ease: 'power2.out',
    opacity: 1,
    duration: 0.3
  });

  tl.fromTo(second, {
    y: '100%',
    opacity: 0,
  }, {  
    y: '0%',
    ease: 'power2.out',
    opacity: 1,
    duration: 0.3
  });

  tl.fromTo(third, {
    y: '100%',
    opacity: 0,
  }, {
    y: '0%',
    ease: 'power2.out',
    opacity: 1,
    duration: 0.3
  });

  tl.fromTo(four, {
    y: '100%',
    opacity: 0,
  }, {
    y: '0%',
    ease: 'power2.out',
    opacity: 1,
    duration: 0.3
  });
   tl.fromTo(mail, {
    y: '100%',
    opacity: 0,
  }, {
    y: '0%',
    ease: 'power2.out',
    opacity: 1,
    duration: 0.2
  });
});

menuClose.addEventListener('click', () => {
  gsap.to(fullMenu, {
    y: '100%',
    ease: 'power2.in',
    duration: 0.6
  });
});


// Description 
const descriptionSection = document.querySelector('#description-section');

if (descriptionSection) {
    gsap.to(descriptionSection, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
            trigger: descriptionSection,
            start: "top 80%", 
            once: true,       
        }
    });
}

const heroVideoSource = document.querySelector('#hero-video source');
if (heroVideoSource) {
    heroVideoSource.src = "videos/video-cuisiniste-lyon-italian-kitchen.mp4";
}

const thumbs = document.querySelectorAll('.project-thumb');
const activeImg = document.querySelector('#active-project-img');

thumbs.forEach((thumb) => {
    thumb.addEventListener('mouseenter', () => {
        const newSrc = thumb.getAttribute('data-big');
        
        if (activeImg.src !== newSrc) {
            activeImg.src = newSrc;
            gsap.fromTo("#big-img-container", 
                { opacity: 0.4, scale: 1.03 }, 
                { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" }
            );
        }

        thumbs.forEach((t) => {
            const indicator = t.querySelector('.indicator');
            // Reset
            indicator.classList.remove('w-full', 'opacity-100');
            indicator.classList.add('w-0', 'opacity-0');
        });

        const currentIndicator = thumb.querySelector('.indicator');
        currentIndicator.classList.remove('w-0', 'opacity-0');
        currentIndicator.classList.add('w-full', 'opacity-100');
    });
});

// Second Projects  (Reverse)
const activeImg2 = document.querySelector('#active-project-img-2');
const bigImgContainer2 = document.querySelector('#big-img-container-2');
const thumbs2 = document.querySelectorAll('.project-thumb-2');


gsap.from("#projects-section-2 .project-item", {
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#projects-section-2",
        start: "top 80%",
    },
});


thumbs2.forEach((thumb) => {
    thumb.addEventListener('mouseenter', () => {
        const newSrc = thumb.getAttribute('data-big');
        const indicator = thumb.querySelector('.indicator');

        // Big image
        if (activeImg2.getAttribute('src') !== newSrc) {
            activeImg2.setAttribute('src', newSrc);
            gsap.fromTo(bigImgContainer2, 
                { opacity: 0.4, scale: 1.03 }, 
                { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" }
            );
        }

        thumbs2.forEach(t => {
            const ind = t.querySelector('.indicator');
            ind.classList.remove('w-full', 'opacity-100');
            ind.classList.add('w-0', 'opacity-0');
        });
        indicator.classList.remove('w-0', 'opacity-0');
        indicator.classList.add('w-full', 'opacity-100');
    });
});

// Reset  on mouse leave
document.querySelector('#project-grid-2').addEventListener('mouseleave', () => {
    const firstImg = thumbs2[0].getAttribute('data-big');
    activeImg2.setAttribute('src', firstImg);
    
    thumbs2.forEach((t, i) => {
        const ind = t.querySelector('.indicator');
        if (i === 0) {
            ind.classList.remove('w-0', 'opacity-0');
            ind.classList.add('w-full', 'opacity-100');
        } else {
            ind.classList.remove('w-full', 'opacity-100');
            ind.classList.add('w-0', 'opacity-0');
        }
    });
});


//  All Our Achievements 
const achievementsLink = document.querySelector('#achievements-link');
const underline = document.querySelector('#achievement-underline');

if (achievementsLink && underline) {
    achievementsLink.addEventListener('mouseenter', () => {
        gsap.killTweensOf(underline);
    });

    achievementsLink.addEventListener('mouseleave', () => {
        gsap.killTweensOf(underline);
      
        gsap.to(underline, {
            scaleX: 1, 
            duration: 0.25,
            ease: "power2.out",
            transformOrigin: "left center"
        });
    });
}


//  Carousel
const newsSlides = [
    { image: "projects/project1.jpg", title: "Atmosphère Minérale", subtitle: "Cuisine en pierre naturelle" },
    { image: "projects/project2.jpg", title: "Design Italien", subtitle: "L'élégance du sur-mesure" },
    { image: "projects/project3.jpg", title: "Modernité", subtitle: "Lignes pures et matériaux nobles" }
];

let activeIdx = 0;
let isAnimating = false;

const currSlideEl = document.querySelector('#curr-slide');
const nextSlideEl = document.querySelector('#next-slide');
const carouselNextBtn = document.querySelector('#carousel-next-btn');

function updateSlideContent(element, slideData) {
    element.querySelector('img').src = slideData.image;
    element.querySelector('.slide-title').textContent = `“${slideData.title}”`;
    element.querySelector('.slide-subtitle').textContent = slideData.subtitle || "";
}

function goNext() {
    if (isAnimating || newsSlides.length <= 1) return;
    isAnimating = true;

    const nextIdx = (activeIdx + 1) % newsSlides.length;
    updateSlideContent(nextSlideEl, newsSlides[nextIdx]);

    gsap.set(nextSlideEl, { xPercent: 15, opacity: 0 }); 
    
    const tl = gsap.timeline({
        onComplete: () => {
            activeIdx = nextIdx;
            updateSlideContent(currSlideEl, newsSlides[activeIdx]);
            gsap.set(currSlideEl, { xPercent: 0, opacity: 1 });
            gsap.set(nextSlideEl, { opacity: 0, xPercent: 0 });
            isAnimating = false;
        }
    });

    tl.to(currSlideEl, { xPercent: -15, opacity: 0, duration: 0.55, ease: "power3.out" }, 0);
    tl.to(nextSlideEl, { xPercent: 0, opacity: 1, duration: 0.55, ease: "power3.out" }, 0);
}

if (carouselNextBtn) {
    carouselNextBtn.addEventListener('click', goNext);
}

if (newsSlides.length > 0) {
    updateSlideContent(currSlideEl, newsSlides[0]);
}

// Series 
const seriesTitle = document.querySelector('#series-title');
const seriesItems = document.querySelectorAll('.series-item');

if (seriesTitle) {
    gsap.to(seriesTitle, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: {
            trigger: seriesTitle,
            start: "top 80%",
            once: true,
        },
    });
}

if (seriesItems.length > 0) {
    
    gsap.to(seriesItems, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#series-grid",
            start: "top 80%",
            once: true,
        },
    });
}


//Brands 
const brandsSection = document.querySelector('#brands-section');

if (brandsSection) {
    gsap.from(brandsSection, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: brandsSection,
            start: "top 85%",
            once: true,
        },
    });
}

// process 
const processSection = document.querySelector('#process-section');
if (processSection) {
    const rows = document.querySelectorAll('.process-row');

    gsap.fromTo(
        rows,
        { 
            opacity: 0, 
            y: 28 
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.18,
            scrollTrigger: {
                trigger: processSection,
                start: "top 75%",
                once: true,
            },
        }
    );
}

// Toggle Hidden Content (Open/Close)
const readExcerptBtn = document.querySelector('#read-excerpt-btn');
const hiddenContent = document.querySelector('#hidden-content');

if (readExcerptBtn && hiddenContent) {
    readExcerptBtn.addEventListener('click', () => {
        const isHidden = hiddenContent.classList.contains('hidden');
        const btnText = readExcerptBtn.querySelector('span');

        if (isHidden) {
            // OPEN
            hiddenContent.classList.remove('hidden');
            
            // Animate: Height 0->Auto, Opacity 0->1, Y 50->0
            gsap.fromTo(hiddenContent, 
                { height: 0, opacity: 0, y: 50 },
                { height: "auto", opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            );

            // Update text
            if(btnText) btnText.textContent = "Close excerpt";

        } else {
            // CLOSE
            gsap.to(hiddenContent, {
                height: 0,
                opacity: 0,
                y: 20,
                duration: 0.4,
                ease: "power2.in",
                onComplete: () => {
                    hiddenContent.classList.add('hidden');
                    // Reset styling for next open to prevent conflicts
                    gsap.set(hiddenContent, { clearProps: "all" });
                    hiddenContent.classList.add('hidden'); 
                }
            });

            // Revert text
            if(btnText) btnText.textContent = "Read an excerpt";
        }
    });
}