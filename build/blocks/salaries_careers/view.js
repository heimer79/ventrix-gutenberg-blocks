/******/ (() => { // webpackBootstrap
/*!*********************************************!*\
  !*** ./src/blocks/salaries_careers/view.js ***!
  \*********************************************/
// When the document is ready, we set up the behavior for both desktop and mobile tables.
jQuery(document).ready(function ($) {
  /**
   * removeHeightFixedClasses
   * Removes the "height-fixed" classes from the main container (for both mobile and desktop),
   * taking into account that these classes might or might not be present.
   */
  function removeHeightFixedClasses(block) {
    const containers = block.find('.ventrix-table-container, .ventrix-mobile-table-container');
    containers.removeClass('height-fixed-mobile-salary-standard height-fixed-mobile-career-bridge height-fixed-mobile-career-standard height-fixed-desktop');
  }

  /**
   * initSalariesTable
   * Initializes the salaries or careers table, handling both mobile and desktop versions.
   * @param {string} blockId - The ID of the block container.
   * @param {boolean} isMobile - Flag to handle mobile vs. desktop logic.
   */
  function initSalariesTable(blockId, isMobile) {
    const block = $('#' + blockId);
    // Use different selectors for mobile or desktop.
    const tableClass = isMobile ? '.cafeto-mobile-table' : '.ventrix-table';
    const table = block.find(tableClass);
    const searchInputClass = isMobile ? '.cafeto-mobile-search-input' : '.cafeto-search-input';
    const entriesSelectClass = isMobile ? '.cafeto-mobile-entries-select' : '.cafeto-entries-select';
    const prevPageBtnClass = isMobile ? '.cafeto-mobile-prev-page' : '.cafeto-prev-page';
    const nextPageBtnClass = isMobile ? '.cafeto-mobile-next-page' : '.cafeto-next-page';
    const showingStartClass = isMobile ? '.cafeto-mobile-showing-start' : '.cafeto-showing-start';
    const showingEndClass = isMobile ? '.cafeto-mobile-showing-end' : '.cafeto-showing-end';
    const totalEntriesClass = isMobile ? '.cafeto-mobile-total-entries' : '.cafeto-total-entries';
    const searchInput = block.find(searchInputClass);
    const entriesSelect = block.find(entriesSelectClass);
    const prevPageBtn = block.find(prevPageBtnClass);
    const nextPageBtn = block.find(nextPageBtnClass);
    const showingStart = block.find(showingStartClass);
    const showingEnd = block.find(showingEndClass);
    const totalEntriesElement = block.find(totalEntriesClass);
    let currentPage = 1;
    let entriesPerPage = parseInt(entriesSelect.val()) || (isMobile ? 5 : 10);

    // Store data for pagination and filtering
    let allEntries = [];
    let filteredEntries = [];
    // The fixed entry is for the "United States" row 
    let fixedEntry = null;

    /**
     * initializeData
     * Gathers rows or entries and identifies the fixed entry if present.
     */
    function initializeData() {
      if (isMobile) {
        table.find('thead').each(function () {
          const entryHead = $(this);
          const entryBody = entryHead.next('tbody');

          // Check if this is the fixed "United States" row
          if (entryHead.hasClass('cafeto-us-row') || entryBody.hasClass('cafeto-us-row')) {
            fixedEntry = {
              head: entryHead,
              body: entryBody
            };
          } else {
            allEntries.push({
              head: entryHead,
              body: entryBody
            });
          }
        });
      } else {
        // For desktop, rows are in the tbody
        const rows = table.find('tbody tr');
        rows.each(function () {
          const row = $(this);
          // Check if it is the fixed row
          if (row.hasClass('cafeto-fixed-row') || row.hasClass('cafeto-us-row')) {
            fixedEntry = row;
          } else {
            // Convert to DOM element
            allEntries.push(row[0]);
          }
        });
      }
      filteredEntries = allEntries.slice();
      updateTotalEntries();
    }

    /**
     * updateTotalEntries
     * Updates the total entries count displayed, including the fixed entry if visible.
     */
    function updateTotalEntries() {
      const total = filteredEntries.length + (fixedEntry && !isFixedEntryHidden() ? 1 : 0);
      totalEntriesElement.text(total);
    }

    /**
     * isFixedEntryHidden
     * Checks if the fixed entry is hidden. Mobile version checks head; desktop checks row.
     */
    function isFixedEntryHidden() {
      if (isMobile) {
        return fixedEntry.head.hasClass('ventrix-hidden');
      } else {
        return $(fixedEntry).hasClass('ventrix-hidden');
      }
    }

    /**
     * filterTable
     * Filters the entries based on the text typed into the search input.
     */
    function filterTable() {
      const filter = searchInput.val().toUpperCase();
      filteredEntries = [];
      if (isMobile) {
        $.each(allEntries, function (index, entry) {
          let matchFound = false;

          // Check in the head (Area)
          const areaName = entry.head.find('th').text();
          if (areaName.toUpperCase().indexOf(filter) > -1) {
            matchFound = true;
          } else {
            // Check the body (other cells)
            entry.body.find('td').each(function () {
              const cellText = $(this).text();
              if (cellText.toUpperCase().indexOf(filter) > -1) {
                matchFound = true;
                return false; // Break
              }
            });
          }
          if (matchFound) {
            filteredEntries.push(entry);
            entry.head.removeClass('ventrix-hidden');
            entry.body.removeClass('ventrix-hidden');
          } else {
            entry.head.addClass('ventrix-hidden');
            entry.body.addClass('ventrix-hidden');
          }
        });

        // Handle the fixed entry (United States row)
        if (fixedEntry) {
          let matchFound = false;
          const areaName = fixedEntry.head.find('th').text();
          if (areaName.toUpperCase().indexOf(filter) > -1) {
            matchFound = true;
          } else {
            fixedEntry.body.find('td').each(function () {
              const cellText = $(this).text();
              if (cellText.toUpperCase().indexOf(filter) > -1) {
                matchFound = true;
                return false;
              }
            });
          }
          if (matchFound) {
            fixedEntry.head.removeClass('ventrix-hidden');
            fixedEntry.body.removeClass('ventrix-hidden');
          } else {
            fixedEntry.head.addClass('ventrix-hidden');
            fixedEntry.body.addClass('ventrix-hidden');
          }
        }
      } else {
        // For desktop
        $.each(allEntries, function (index, row) {
          const $row = $(row);
          let matchFound = false;
          $row.find('td').each(function () {
            const cellText = $(this).text();
            if (cellText.toUpperCase().indexOf(filter) > -1) {
              matchFound = true;
              return false; // Break
            }
          });
          if (matchFound) {
            $row.removeClass('ventrix-hidden');
            filteredEntries.push(row);
          } else {
            $row.addClass('ventrix-hidden');
          }
        });

        // Handle the fixed entry
        if (fixedEntry) {
          const $fixedRow = $(fixedEntry);
          let matchFound = false;
          $fixedRow.find('td').each(function () {
            const cellText = $(this).text();
            if (cellText.toUpperCase().indexOf(filter) > -1) {
              matchFound = true;
              return false;
            }
          });
          if (matchFound) {
            $fixedRow.removeClass('ventrix-hidden');
          } else {
            $fixedRow.addClass('ventrix-hidden');
          }
        }
      }
      updateTotalEntries();
      currentPage = 1;
      updatePagination();
    }

    /**
     * sortTable
     * Sorts columns in ascending or descending order when the table header is clicked.
     * @param {number} n - Index of the column to sort by.
     */
    function sortTable(n) {
      let isAscending;
      if (isMobile) {
        // For mobile, we handle the icons differently
        const th = block.find('.cafeto-mobile-column-header').eq(n);
        const sortIcon = th.find('.cafeto-sort-icon');
        isAscending = sortIcon.text() === '↓';
        sortIcon.text(isAscending ? '↑' : '↓');
        filteredEntries.sort(function (a, b) {
          let aValue, bValue;
          if (n === 0) {
            // Sorting by 'Area' (located in <thead>)
            aValue = a.head.find('th').text();
            bValue = b.head.find('th').text();
          } else {
            // Sorting by other columns in the body
            aValue = a.body.find('td').eq((n - 1) * 2 + 1).text();
            bValue = b.body.find('td').eq((n - 1) * 2 + 1).text();
          }
          if ($.isNumeric(aValue) && $.isNumeric(bValue)) {
            return isAscending ? aValue - bValue : bValue - aValue;
          } else {
            return isAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
          }
        });

        // Reset other sort icons
        block.find('.cafeto-mobile-column-header .cafeto-sort-icon').text('↕');
        // Set the chosen icon
        sortIcon.text(isAscending ? '↑' : '↓');

        // Re-render after sorting
        renderMobileTable();
      } else {
        // For desktop
        const th = table.find('thead th').eq(n);
        const sortIcon = th.find('.cafeto-sort-icon');
        isAscending = sortIcon.text() === '↓';
        sortIcon.text(isAscending ? '↑' : '↓');
        filteredEntries.sort(function (a, b) {
          const aValue = $(a).find('td').eq(n).text();
          const bValue = $(b).find('td').eq(n).text();
          if ($.isNumeric(aValue) && $.isNumeric(bValue)) {
            return isAscending ? aValue - bValue : bValue - aValue;
          } else {
            return isAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
          }
        });

        // Reset other sort icons
        table.find('thead th .cafeto-sort-icon').text('↕');
        // Set the chosen icon
        sortIcon.text(isAscending ? '↑' : '↓');

        // Re-render by appending rows again
        const tbody = table.find('tbody');
        tbody.empty();

        // If there's a fixed entry, append it first
        if (fixedEntry) {
          tbody.append(fixedEntry);
        }
        tbody.append(filteredEntries);
      }
      currentPage = 1;
      updatePagination();
    }

    /**
     * updatePagination
     * Handles pagination logic: showing only entries belonging to the current page and updating the display.
     * (Spanish text "Botón página anterior" and "Botón página siguiente" translated to English)
     */
    function updatePagination() {
      const fixedEntryCount = fixedEntry && !isFixedEntryHidden() ? 1 : 0;
      const totalEntriesCount = filteredEntries.length + fixedEntryCount;
      const totalPages = Math.ceil(totalEntriesCount / entriesPerPage);
      if (isMobile) {
        let displayIndex = 0;

        // Show or hide fixed entry accordingly
        if (fixedEntry && !isFixedEntryHidden()) {
          fixedEntry.head.show();
          fixedEntry.body.show();
          displayIndex = 1;
        } else if (fixedEntry) {
          fixedEntry.head.hide();
          fixedEntry.body.hide();
        }

        // Show only entries in the current page range
        $.each(filteredEntries, function (index, entry) {
          const idx = index + displayIndex;
          if (idx >= (currentPage - 1) * entriesPerPage && idx < currentPage * entriesPerPage) {
            entry.head.show();
            entry.body.show();
          } else {
            entry.head.hide();
            entry.body.hide();
          }
        });
      } else {
        let displayIndex = 0;
        if (fixedEntry && !isFixedEntryHidden()) {
          $(fixedEntry).show();
          displayIndex = 1;
        } else if (fixedEntry) {
          $(fixedEntry).hide();
        }
        $.each(filteredEntries, function (index, row) {
          const $row = $(row);
          const idx = index + displayIndex;
          if (idx >= (currentPage - 1) * entriesPerPage && idx < currentPage * entriesPerPage) {
            $row.show();
          } else {
            $row.hide();
          }
        });
      }
      const start = totalEntriesCount === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1;
      const end = Math.min(currentPage * entriesPerPage, totalEntriesCount);

      // Update page info
      showingStart.text(start);
      showingEnd.text(end);
      totalEntriesElement.text(totalEntriesCount);

      // Manage previous page button
      if (currentPage === 1) {
        prevPageBtn.prop('disabled', true).removeClass('enabled');
      } else {
        prevPageBtn.prop('disabled', false).addClass('enabled');
      }

      // Manage next page button
      if (currentPage >= totalPages || totalPages === 0) {
        nextPageBtn.prop('disabled', true).removeClass('enabled');
      } else {
        nextPageBtn.prop('disabled', false).addClass('enabled');
      }
    }

    /**
     * renderMobileTable
     * Reconstructs the mobile table with sorted or filtered entries.
     */
    function renderMobileTable() {
      table.empty();
      if (fixedEntry && !isFixedEntryHidden()) {
        table.append(fixedEntry.head);
        table.append(fixedEntry.body);
      }
      $.each(filteredEntries, function (index, entry) {
        table.append(entry.head);
        table.append(entry.body);
      });
      updatePagination();
    }

    // --- Event handlers ---

    // Search input changes (in Spanish was "Búsqueda" -> "Search")
    searchInput.on('input', function () {
      removeHeightFixedClasses(block);
      currentPage = 1;
      filterTable();
    });

    // Changing the number of entries (in Spanish "Cambio de número de entradas" -> "Changing the number of entries")
    entriesSelect.on('change', function () {
      removeHeightFixedClasses(block);
      entriesPerPage = parseInt($(this).val()) || (isMobile ? 5 : 10);
      currentPage = 1;
      updatePagination();
    });

    // Previous page button (in Spanish "Botón página anterior")
    prevPageBtn.on('click', function () {
      removeHeightFixedClasses(block);
      if (currentPage > 1) {
        currentPage--;
        updatePagination();
      }
    });

    // Next page button (in Spanish "Botón página siguiente")
    nextPageBtn.on('click', function () {
      removeHeightFixedClasses(block);
      const totalPages = Math.ceil((filteredEntries.length + (fixedEntry && !isFixedEntryHidden() ? 1 : 0)) / entriesPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        updatePagination();
      }
    });

    // Sorting headers on click (in Spanish "Ordenar al hacer clic en headers")
    if (isMobile) {
      const filterOptions = block.find('.cafeto-mobile-column-header');
      filterOptions.each(function (index) {
        $(this).on('click', function () {
          removeHeightFixedClasses(block);
          sortTable(index);
        });
      });
    } else {
      const headers = table.find('thead th');
      headers.each(function (index) {
        $(this).on('click', function () {
          removeHeightFixedClasses(block);
          sortTable(index);
        });
      });
    }

    // Initialization of the table
    initializeData();
    updatePagination();
  }

  // Initialize all desktop tables
  $('.cafeto-salaries-careers-table-desktop').each(function () {
    const blockId = $(this).attr('id');
    initSalariesTable(blockId, false);
  });

  // Initialize all mobile tables
  $('.cafeto-salaries-careers-table-mobile').each(function () {
    const blockId = $(this).attr('id');
    initSalariesTable(blockId, true);
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map