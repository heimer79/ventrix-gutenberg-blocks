// Utility function to handle smooth scrolling
function initSmoothScroll(block) {
    block.querySelectorAll('.rankings-top-bar--years a').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            if (!this.classList.contains('disabled')) {
                event.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 150;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            }
        });
    });
}

// Popup management functions
function createPopupManager(block) {
    const aboutButton = block.querySelector('.rankings-top-bar--about');
    const popup = block.querySelector('.rankings-popup--widget');
    const closeButton = block.querySelector('.rankings-popup--widget--close');
    const overlay = block.querySelector('.rankings-popup--overlay');

    if (!popup || !overlay) return;

    const showPopup = () => {
        popup.classList.remove('hidden');
        overlay.classList.remove('hidden');
    };

    const hidePopup = () => {
        popup.classList.add('hidden');
        overlay.classList.add('hidden');
    };

    // Initialize popup event listeners
    if (aboutButton) {
        aboutButton.addEventListener('click', showPopup);
    }

    if (closeButton) {
        closeButton.addEventListener('click', hidePopup);
    }

    overlay.addEventListener('click', hidePopup);

    // Global escape key handler
    const handleEscapeKey = (event) => {
        if (event.key === 'Escape') {
            hidePopup();
        }
    };

    document.addEventListener('keydown', handleEscapeKey);

    // Return cleanup function
    return () => {
        document.removeEventListener('keydown', handleEscapeKey);
    };
}

// Accordion functionality
function initAccordion(block) {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    // Handle desktop toggle buttons
    block.querySelectorAll(".rankings-list__item-toggle-btn:not(.rankings-list__item-heading__top .rankings-list__item-toggle-btn)").forEach(button => {
        button.addEventListener("click", function() {
            const toggleContent = this.previousElementSibling;
            const rightSection = this.closest(".rankings-list__item").querySelector(".rankings-list__item-right");
            const item = this.closest(".rankings-list__item");
            
            if (isMobile) {
                if (item) {
                    item.classList.toggle("collapsed");
                }
                this.classList.toggle("expanded");
            } else {
                toggleContent.classList.toggle("expanded");
                this.classList.toggle("expanded");
                
                if (rightSection) {
                    rightSection.classList.toggle("collapsed", !toggleContent.classList.contains("expanded"));
                }

                if (item) {
                    item.classList.toggle("collapsed", !toggleContent.classList.contains("expanded"));
                }
    
                this.textContent = toggleContent.classList.contains("expanded") ? "Less Details" : "More Details";
            }
        });
    });

    // Handle mobile toggle buttons (inside heading)
    block.querySelectorAll(".rankings-list__item-heading__top .rankings-list__item-toggle-btn").forEach(button => {
        button.addEventListener("click", function() {
            const item = this.closest(".rankings-list__item");
            const toggleContent = item.querySelector(".rankings-list__item-toggle");
            
            if (isMobile) {
                if (item) {
                    item.classList.toggle("collapsed");
                }
            }
            
            toggleContent.classList.toggle("expanded");
            this.classList.toggle("expanded");
        });
    });
}

// Expand/Collapse functionality
function createExpandCollapseManager(block) {
    const expandAllButton = block.querySelector('.expand-all');
    const collapseAllButton = block.querySelector('.collapse-all');
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (!expandAllButton || !collapseAllButton) return;

    const toggleAllItems = (shouldExpand) => {
        // Handle each item individually
        block.querySelectorAll(".rankings-list__item").forEach(item => {
            if (isMobile) {
                // Mobile specific handling
                const toggleContent = item.querySelector(".rankings-list__item-toggle");
                const mobileButton = item.querySelector(".rankings-list__item-heading__top .rankings-list__item-toggle-btn");
                
                if (shouldExpand) {
                    // Expand
                    item.classList.remove("collapsed");
                    if (toggleContent) toggleContent.classList.add("expanded");
                    if (mobileButton) {
                        mobileButton.classList.remove("expanded");
                    }
                } else {
                    // Collapse
                    item.classList.add("collapsed");
                    if (toggleContent) toggleContent.classList.remove("expanded");
                    if (mobileButton) {
                        mobileButton.classList.add("expanded");
                    }
                }
            } else {
                // Desktop specific handling
                const toggleContent = item.querySelector(".rankings-list__item-toggle");
                const desktopButton = item.querySelector(".rankings-list__item-toggle-btn:not(.rankings-list__item-heading__top .rankings-list__item-toggle-btn)");
                const rightSection = item.querySelector(".rankings-list__item-right");
                
                if (shouldExpand) {
                    // Expand
                    if (toggleContent) toggleContent.classList.add("expanded");
                    if (desktopButton) {
                        desktopButton.classList.add("expanded");
                        desktopButton.textContent = "Less Details";
                    }
                    if (rightSection) rightSection.classList.remove("collapsed");
                    item.classList.remove("collapsed");
                } else {
                    // Collapse
                    if (toggleContent) toggleContent.classList.remove("expanded");
                    if (desktopButton) {
                        desktopButton.classList.remove("expanded");
                        desktopButton.textContent = "More Details";
                    }
                    if (rightSection) rightSection.classList.add("collapsed");
                    item.classList.add("collapsed");
                }
            }
        });

        // Update expand/collapse button states
        updateButtonStates(expandAllButton, collapseAllButton, shouldExpand);
    };

    // Initialize button states
    updateButtonStates(expandAllButton, collapseAllButton, false);

    // Add event listeners
    expandAllButton.addEventListener('click', () => toggleAllItems(true));
    collapseAllButton.addEventListener('click', () => toggleAllItems(false));
}

function updateButtonStates(expandButton, collapseButton, isExpanded) {
    if (isExpanded) {
        expandButton.classList.remove('collapsed');
        expandButton.classList.add('active');
        collapseButton.classList.add('collapsed');
        collapseButton.classList.remove('active');
    } else {
        collapseButton.classList.remove('collapsed');
        collapseButton.classList.add('active');
        expandButton.classList.add('collapsed');
        expandButton.classList.remove('active');
    }
}

// Main initialization function
export function applyTraditionalRankings(block) {
    if (!block) return;

    // Initialize all features
    initSmoothScroll(block);
    const popupCleanup = createPopupManager(block);
    initAccordion(block);
    createExpandCollapseManager(block);

    // Return cleanup function if needed
    return () => {
        if (popupCleanup) popupCleanup();
    };
}