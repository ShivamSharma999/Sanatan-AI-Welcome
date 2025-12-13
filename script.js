const stickySection = document.querySelector(".sticky-section");
const horizontalWrapper = document.querySelector(".horizontal-wrapper");
const sectionItems = document.querySelectorAll(".section-item");

// Horizontal Scroll
const scrollTween = gsap.to(horizontalWrapper, {
    x: () => -(horizontalWrapper.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
        trigger: stickySection,
        pin: true,
        scrub: 1,
        end: () => "+=" + horizontalWrapper.scrollWidth
    }
});

// Text Animations using containerAnimation
sectionItems.forEach((item, i) => {
    const title = item.querySelector(".anim-title");
    const para = item.querySelector(".anim-para");

    // Split text for animation
    const titleSplit = new SplitText(title, { type: "chars" });
    const paraSplit = new SplitText(para, { type: "words, lines" });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: item,
            containerAnimation: scrollTween,
            start: "left center",
            toggleActions: "play none none reverse"
        }
    });

    tl.from(titleSplit.chars, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "elastic.out"
    })
        .to(para, {
            opacity: 1,
            duration: 0.5
        }, "-=0.4")
        .from(paraSplit.words, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.02,
            ease: "bounce.out"
        }, "<"); // start at same time as previous tween
});