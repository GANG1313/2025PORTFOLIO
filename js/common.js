$(function(){
    
    gsap.registerPlugin(ScrollTrigger);

    // pageloda, intro
    const changeWord = document.querySelector(".change-word");
    const pageLoad = document.querySelector(".page-load");

    gsap.set(".visual_text-row", { opacity: 0 });
    gsap.set(".visual_text-row > *", { x: -50, opacity: 0 });
    gsap.set(".visual__video", { x: -100, opacity: 0, scale: 0.95 }); 
    gsap.set(".visual__video video", { opacity: 0, display: "none" }); 
    
    setTimeout(() => {
        gsap.to(changeWord, { opacity: 0, duration: 0.5, onComplete: () => {
            changeWord.textContent = "publisher";
            gsap.to(changeWord, { opacity: 1, duration: 0.5 });
        }});
    }, 1000);
    
    setTimeout(() => {
        gsap.to(pageLoad, {
            opacity: 0,
            duration: 2,
            ease: "power4.inOut",
            onComplete: () => {
                pageLoad.style.display = "none";
    
                setTimeout(() => {
                    startIntroAnimation();
                }, 0);
            }
        });
    }, 2000);
    
    function startIntroAnimation() {
        gsap.utils.toArray(".visual_text-row").forEach((row, rowIndex) => {
            const elements = row.children;
            const videos = row.querySelectorAll(".visual__video video");
    
            gsap.to(row, { opacity: 1, duration: 0.3 });
    
            gsap.to(elements, {
                x: 0, 
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
            });
    
            videos.forEach((video, videoIndex) => {
                
                gsap.to(video, {
                    x: 0, 
                    opacity: 1, 
                    scale: 1, 
                    duration: 1.4,
                    ease: "power3.out",
                    delay: rowIndex * 0.3 + videoIndex * 0.2,
                    onStart: () => {
                        video.style.display = "block"; // 
                    }
                });
    
                gsap.to(video.querySelector(".visual__video video"), {
                    opacity: 1, 
                    duration: 0.8,
                    ease: "power4.out",
                });
            });
        });
    }
    

    // 마우스 커서
    const cursor = document.querySelector('.cursor');
    const hoverTargets = document.querySelectorAll('.hover-target');
    let scrollPosition = 0;

    // 디바이스가 터치 지원 여부 확인
    const isTouchDevice = window.matchMedia('(max-width: 1024px)').matches;

    if (!isTouchDevice) {
        // 커서 움직임
        document.addEventListener('mousemove', (e) => {
            cursor.style.top = `${e.clientY}px`;
            cursor.style.left = `${e.clientX}px`;
        });

        // 커서 hover 효과
        hoverTargets.forEach((target) => {
            target.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            target.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    } else {
        cursor.style.display = 'none'; // 모바일에서는 커서 숨기기
    }

    

    // gnb 
    $('#gnbToggle').click(() => {
        const body = $('body');
        const header = $('.header');
        const gnbWrapper = $('.gnb-wrapper');

        if (body.hasClass('dimmed')) {
            body.removeClass('dimmed').css({ top: '' });
            window.scrollTo(0, scrollPosition);
        } else {
            scrollPosition = window.scrollY;
            body.addClass('dimmed').css({ top: -scrollPosition + 'px' });
        }

        $('#gnbToggle').toggleClass('open close');
        header.toggleClass('open');
        gnbWrapper.toggleClass('open');
    });

    // 메뉴 링크 클릭 시 닫기
    $('.nav').click(() => {
        const body = $('body');
        const header = $('.header');
        const gnbWrapper = $('.gnb-wrapper');

        body.removeClass('dimmed').css({ top: '' });
        window.scrollTo(0, scrollPosition);

        $('#gnbToggle').toggleClass('open close');
        header.toggleClass('open');
        gnbWrapper.toggleClass('open');
    });

    window.history.scrollRestoration = 'manual';

    window.addEventListener('load', () => {
        const savedPosition = parseInt(localStorage.getItem('scrollPosition'), 10);
        if (!isNaN(savedPosition)) {
            setTimeout(() => {
                window.scrollTo(0, savedPosition);
            }, 100);
            localStorage.removeItem('scrollPosition');
        }
    });

    window.addEventListener('scroll', () => {
        localStorage.setItem('scrollPosition', window.scrollY);
    });


// intro
const visualAni = gsap.timeline({
    scrollTrigger: {
        trigger: '.sec-intro .intro_inner .visual__text-container',
        start: 'top bottom', 
        end: 'bottom top',
        scrub: 1.3,
    }
});

gsap.utils.toArray('.visual_text-row').forEach(function (row, index) {

    gsap.fromTo(row,
        {
            xPercent: 0,
        },
        {
            xPercent: index % 2 === 0 ? -100 : 100, 
            scrollTrigger: {
                trigger: row,
                start: 'top',
                end: 'bottom',
                scrub: 1.3, 
                toggleActions: 'play none none reverse',
            },
        });

});

// about
const targets = gsap.utils.toArray(".section_txt");

targets.forEach(target => {
let SplitClient = new SplitType(target, { type: "lines" });

let lines = SplitClient.lines;

    gsap.fromTo(
    lines,
    { yPercent: 30, autoAlpha: 0 },
    { 
    yPercent: 0, autoAlpha: 1, duration: 1, ease: "circ.out", stagger: 0.2,
    scrollTrigger: {
        trigger: target,
        start: "top 80%", 
        end: "bottom 40%",
        toggleActions: "play reverse play reverse", 
        markers: false 
    }
    }
    );
});

// works
gsap.from(".works_tit h3", {
    y: 50, 
    autoAlpha: 0, 
    duration: 1, 
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".works_tit", 
        start: "top 80%", 
        end: "top 30%",
        scrub: 1,
    }
    
});



gsap.registerPlugin(ScrollTrigger);

        function animateText() {
            gsap.fromTo(".title-area p span", 
                { opacity: 0, y: 30 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1,
                    ease: "power2.out",
                    stagger: 0.3,
                    scrollTrigger: {
                        trigger: ".title-area p span",
                        start: "top 100%",
                        toggleActions: "play reverse play reverse"
                    }
                }
            );
        }

        animateText();
        gsap.registerPlugin();

        const banner = document.querySelector(".contact-banner");
        const items = Array.from(banner.children);

        items.forEach((item) => {
            let clone = item.cloneNode(true);
            banner.appendChild(clone);
        });

        const marqueeAnimation = gsap.to(".contact-banner", {
            x: "-50%",
            duration: 15,
            ease: "linear",
            repeat: -1
        });

        document.querySelector(".contact-banner-wrap").addEventListener("mouseenter", () => {
            marqueeAnimation.pause();
        });

        document.querySelector(".contact-banner-wrap").addEventListener("mouseleave", () => {
            marqueeAnimation.play();
        });
});








