// -----------------------------
// Rankings accordion JS (fixed)
// -----------------------------

/**
 * Update the expand/collapse button UI state based on current items.
 * - If all items open => expand button active
 * - If all items closed => collapse button active
 * - Otherwise => none active (or both inactive)
 */
function updateExpandCollapseState(block) {
  const expandAllButton = block.querySelector(".expand-all");
  const collapseAllButton = block.querySelector(".collapse-all");
  if (!expandAllButton || !collapseAllButton) return;

  const items = Array.from(block.querySelectorAll(".ranking-lists__accordion-item"));
  if (!items.length) return;

  const expandedCount = items.filter(it => it.classList.contains("is-open")).length;

  if (expandedCount === items.length) {
    // All expanded
    expandAllButton.classList.add("active");
    expandAllButton.classList.remove("collapsed");
    collapseAllButton.classList.remove("active");
    collapseAllButton.classList.add("collapsed");
  } else if (expandedCount === 0) {
    // All collapsed
    collapseAllButton.classList.add("active");
    collapseAllButton.classList.remove("collapsed");
    expandAllButton.classList.remove("active");
    expandAllButton.classList.add("collapsed");
  } else {
    // Some open, some closed
    expandAllButton.classList.remove("active", "collapsed");
    collapseAllButton.classList.remove("active", "collapsed");
  }
}

/**
 * Accordion functionality for the new structure.
 * Opens items based on number of schools:
 * - If 5 or fewer: all open
 * - If 6 or more: first 3 open
 */
function initAccordion(block) {
  const summaryRows = Array.from(block.querySelectorAll(".ranking-item__summary"));
  const totalItems = summaryRows.length;

  // Default open logic
  let defaultOpen = 0;
  if (totalItems <= 5) {
    defaultOpen = totalItems; // open all
  } else {
    defaultOpen = 3; // open first 3
  }

  summaryRows.forEach((summary, index) => {
    const item = summary.closest(".ranking-lists__accordion-item");
    if (!item) return;

    const details = item.querySelector(".ranking-item__details");
    const btn = summary.querySelector(".toggle-details");

    // Initial state
    if (index < defaultOpen) {
      item.classList.add("is-open");
      if (details) details.setAttribute("aria-hidden", "false");
      if (btn) {
        btn.setAttribute("aria-expanded", "true");
        btn.textContent = "−";
      }
    } else {
      item.classList.remove("is-open");
      if (details) details.setAttribute("aria-hidden", "true");
      if (btn) {
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = "+";
      }
    }

    // Make the whole summary row clickable
    summary.addEventListener("click", (e) => {
      // ✅ Ignore clicks on links <a> inside the summary
      if (e.target.closest("a")) {
        return; // allow normal link navigation
      }

      e.preventDefault();

      const currentlyExpanded = btn?.getAttribute("aria-expanded") === "true";
      const willBeExpanded = !currentlyExpanded;

      item.classList.toggle("is-open", willBeExpanded);
      if (details) details.setAttribute("aria-hidden", String(!willBeExpanded));
      if (btn) {
        btn.setAttribute("aria-expanded", String(willBeExpanded));
        btn.textContent = willBeExpanded ? "−" : "+";
      }

      updateExpandCollapseState(block);
    });
  });

  // Sync button states on init
  updateExpandCollapseState(block);
}

/**
 * Expand/Collapse All functionality.
 */
function createExpandCollapseManager(block) {
  const expandAllButton = block.querySelector(".expand-all");
  const collapseAllButton = block.querySelector(".collapse-all");
  const items = Array.from(block.querySelectorAll(".ranking-lists__accordion-item"));

  if (!expandAllButton || !collapseAllButton) return;

  const setAll = (shouldExpand) => {
    items.forEach(item => {
      const details = item.querySelector(".ranking-item__details");
      const btn = item.querySelector(".toggle-details");

      item.classList.toggle("is-open", shouldExpand);
      if (details) details.setAttribute("aria-hidden", String(!shouldExpand));
      if (btn) {
        btn.setAttribute("aria-expanded", String(shouldExpand));
        btn.textContent = shouldExpand ? "−" : "+";
      }
    });

    // Update UI state of the control buttons
    updateExpandCollapseState(block);
  };

  // Event listeners
  expandAllButton.addEventListener("click", (e) => {
    e.preventDefault();
    setAll(true);
  });

  collapseAllButton.addEventListener("click", (e) => {
    e.preventDefault();
    setAll(false);
  });

  // Initial state sync (in case initAccordion was not called before)
  updateExpandCollapseState(block);
}

/**
 * Popup manager (keeps previous behavior).
 * Returns a cleanup function to remove listeners (if needed).
 */
function createPopupManager(block) {
  const aboutButton = block.querySelector(".rankings-top-bar__about");
  const popup = block.querySelector(".rankings-popup--widget");
  const closeButton = block.querySelector(".rankings-popup--widget--close");
  const overlay = block.querySelector(".rankings-popup--overlay");

  if (!popup || !overlay) return null;

  const showPopup = () => {
    popup.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };

  const hidePopup = () => {
    popup.classList.add("hidden");
    overlay.classList.add("hidden");
  };

  if (aboutButton) aboutButton.addEventListener("click", showPopup);
  if (closeButton) closeButton.addEventListener("click", hidePopup);
  overlay.addEventListener("click", hidePopup);

  const handleEscapeKey = (event) => {
    if (event.key === "Escape") hidePopup();
  };
  document.addEventListener("keydown", handleEscapeKey);

  return () => {
    if (aboutButton) aboutButton.removeEventListener("click", showPopup);
    if (closeButton) closeButton.removeEventListener("click", hidePopup);
    overlay.removeEventListener("click", hidePopup);
    document.removeEventListener("keydown", handleEscapeKey);
  };
}

// Exported main initializer (keeps the existing API)
export function applyGeo(block) {
  if (!block) return;

  // Popup manager (returns cleanup)
  const popupCleanup = createPopupManager(block);

  // Accordion + expand/collapse manager
  initAccordion(block);
  createExpandCollapseManager(block);

  // Return cleanup function for external use if desired
  return () => {
    if (popupCleanup) popupCleanup();
  };
}

/**
 * Initializes the methodology accordion.
 * Matches the same structure used in your main accordion logic:
 * - Click on label toggles .is-open
 * - aria-expanded + hidden attributes update
 */
function initRankingMethodologyAccordion() {
  const wrapper = document.querySelector(".ranking-methodology");
  if (!wrapper) return;

  const label = wrapper.querySelector(".ranking-methodology__label");
  const content = wrapper.querySelector(".ranking-methodology__content");
  const icon = wrapper.querySelector(".ranking-methodology__icon");

  if (!label || !content) return;

  // Closed by default
  content.hidden = true;
  label.setAttribute("aria-expanded", "false");

  label.addEventListener("click", function (e) {
    e.preventDefault();

    const isOpen = label.getAttribute("aria-expanded") === "true";
    const willOpen = !isOpen;

    label.setAttribute("aria-expanded", String(willOpen));
    content.hidden = !willOpen;

    wrapper.classList.toggle("is-open", willOpen);

    // Rotate icon
    if (icon) {
      icon.style.transform = willOpen ? "rotate(180deg)" : "";
    }
  });
}

// Initialize methodology accordion globally
document.addEventListener("DOMContentLoaded", initRankingMethodologyAccordion);