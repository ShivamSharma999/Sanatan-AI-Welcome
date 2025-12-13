const stickySection = document.querySelector(".sticky-section");
const horizontalWrapper = document.querySelector(".horizontal-wrapper");
const sectionItems = document.querySelectorAll(".section-item");

let mm = gsap.matchMedia();

mm.add("(min-width: 769px)", () => {
    // Desktop: Horizontal Scroll
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

    // Desktop: Text Animations linked to container scroll
    sectionItems.forEach((item) => {
        const title = item.querySelector(".anim-title");
        const para = item.querySelector(".anim-para");

        // Split text
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
            }, "<");
    });
});

mm.add("(max-width: 768px)", () => {
    // Mobile: Vertical Scroll (Standard ScrollTrigger)
    sectionItems.forEach((item) => {
        const title = item.querySelector(".anim-title");
        const para = item.querySelector(".anim-para");

        // Split text (Resetting/re-creating split text for mobile context if needed, 
        // but simple animations often work better without complex splits on small screens 
        // to avoid layout shifts, but let's keep consistency)
        const titleSplit = new SplitText(title, { type: "chars" });
        const paraSplit = new SplitText(para, { type: "words, lines" });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "top 75%", // Trigger when top of section hits 75% of viewport height
                end: "bottom 25%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(titleSplit.chars, {
            y: 50, // Reduced movement for mobile
            opacity: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: "back.out(1.7)"
        })
            .to(para, {
                opacity: 1,
                duration: 0.5
            }, "-=0.2")
            .from(paraSplit.words, {
                y: 10,
                opacity: 0,
                duration: 0.6,
                stagger: 0.01,
                ease: "power2.out"
            }, "<");
    });
});
