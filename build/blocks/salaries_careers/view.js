/******/ (() => { // webpackBootstrap
/*!*********************************************!*\
  !*** ./src/blocks/salaries_careers/view.js ***!
  \*********************************************/
// view.js

jQuery(document).ready(function ($) {
  function initSalariesTable(blockId, isMobile) {
    const block = $('#' + blockId);
    const tableClass = isMobile ? '.cafeto-mobile-table' : '.cafeto-table';
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

    // Data storage
    let allEntries = [];
    let filteredEntries = [];
    let fixedEntry = null; // Para la fila fija de United States

    // Initialize data for mobile table
    function initializeData() {
      if (isMobile) {
        table.find('thead').each(function () {
          const entryHead = $(this);
          const entryBody = entryHead.next('tbody');

          // Verificar si es la entrada fija (United States)
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
        // Para escritorio, las filas están en tbody
        const rows = table.find('tbody tr');
        rows.each(function () {
          const row = $(this);
          if (row.hasClass('cafeto-fixed-row') || row.hasClass('cafeto-us-row')) {
            fixedEntry = row;
          } else {
            allEntries.push(row[0]); // Convertir a elemento DOM
          }
        });
      }
      filteredEntries = allEntries.slice();
      updateTotalEntries();
    }
    function updateTotalEntries() {
      const total = filteredEntries.length + (fixedEntry && !isFixedEntryHidden() ? 1 : 0);
      totalEntriesElement.text(total);
    }
    function isFixedEntryHidden() {
      if (isMobile) {
        return fixedEntry.head.hasClass('cafeto-hidden');
      } else {
        return $(fixedEntry).hasClass('cafeto-hidden');
      }
    }
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
            // Check in the body (other cells)
            entry.body.find('td').each(function () {
              const cellText = $(this).text();
              if (cellText.toUpperCase().indexOf(filter) > -1) {
                matchFound = true;
                return false; // Break loop
              }
            });
          }
          if (matchFound) {
            filteredEntries.push(entry);
            entry.head.removeClass('cafeto-hidden');
            entry.body.removeClass('cafeto-hidden');
          } else {
            entry.head.addClass('cafeto-hidden');
            entry.body.addClass('cafeto-hidden');
          }
        });

        // Handle fixed entry
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
            fixedEntry.head.removeClass('cafeto-hidden');
            fixedEntry.body.removeClass('cafeto-hidden');
          } else {
            fixedEntry.head.addClass('cafeto-hidden');
            fixedEntry.body.addClass('cafeto-hidden');
          }
        }
      } else {
        $.each(allEntries, function (index, row) {
          const $row = $(row);
          let matchFound = false;
          $row.find('td').each(function () {
            const cellText = $(this).text();
            if (cellText.toUpperCase().indexOf(filter) > -1) {
              matchFound = true;
              return false; // Break loop
            }
          });
          if (matchFound) {
            $row.removeClass('cafeto-hidden');
            filteredEntries.push(row);
          } else {
            $row.addClass('cafeto-hidden');
          }
        });

        // Handle fixed entry
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
            $fixedRow.removeClass('cafeto-hidden');
          } else {
            $fixedRow.addClass('cafeto-hidden');
          }
        }
      }
      updateTotalEntries();
      currentPage = 1;
      updatePagination();
    }
    function sortTable(n) {
      let isAscending;
      if (isMobile) {
        const th = block.find('.cafeto-mobile-column-header').eq(n);
        const sortIcon = th.find('.cafeto-sort-icon');
        isAscending = sortIcon.text() === '↓';
        sortIcon.text(isAscending ? '↑' : '↓');
        filteredEntries.sort(function (a, b) {
          let aValue, bValue;
          if (n === 0) {
            // Sorting by 'Area' (assumed to be in the <thead>)
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

        // Update sort icons
        block.find('.cafeto-mobile-column-header .cafeto-sort-icon').text('↕');
        sortIcon.text(isAscending ? '↑' : '↓');

        // Re-render the table
        renderMobileTable();
      } else {
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

        // Update sort icons
        table.find('thead th .cafeto-sort-icon').text('↕');
        sortIcon.text(isAscending ? '↑' : '↓');

        // Re-render the table
        const tbody = table.find('tbody');
        tbody.empty();

        // Append fixed entry if exists
        if (fixedEntry) {
          tbody.append(fixedEntry);
        }
        tbody.append(filteredEntries);
      }
      currentPage = 1;
      updatePagination();
    }
    function updatePagination() {
      const fixedEntryCount = fixedEntry && !isFixedEntryHidden() ? 1 : 0;
      const totalEntriesCount = filteredEntries.length + fixedEntryCount;
      const totalPages = Math.ceil(totalEntriesCount / entriesPerPage);
      if (isMobile) {
        let displayIndex = 0;
        if (fixedEntry && !isFixedEntryHidden()) {
          fixedEntry.head.show();
          fixedEntry.body.show();
          displayIndex = 1;
        } else if (fixedEntry) {
          fixedEntry.head.hide();
          fixedEntry.body.hide();
        }
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
      showingStart.text(start);
      showingEnd.text(end);
      totalEntriesElement.text(totalEntriesCount);

      // Update button states
      if (currentPage === 1) {
        prevPageBtn.prop('disabled', true).removeClass('enabled');
      } else {
        prevPageBtn.prop('disabled', false).addClass('enabled');
      }
      if (currentPage >= totalPages || totalPages === 0) {
        nextPageBtn.prop('disabled', true).removeClass('enabled');
      } else {
        nextPageBtn.prop('disabled', false).addClass('enabled');
      }
    }
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

    // Event handlers
    searchInput.on('input', function () {
      currentPage = 1;
      filterTable();
    });
    entriesSelect.on('change', function () {
      entriesPerPage = parseInt($(this).val()) || (isMobile ? 5 : 10);
      currentPage = 1;
      updatePagination();
    });
    prevPageBtn.on('click', function () {
      if (currentPage > 1) {
        currentPage--;
        updatePagination();
      }
    });
    nextPageBtn.on('click', function () {
      const totalPages = Math.ceil((filteredEntries.length + (fixedEntry && !isFixedEntryHidden() ? 1 : 0)) / entriesPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        updatePagination();
      }
    });

    // Attach sorting to headers or filter options
    if (isMobile) {
      const filterOptions = block.find('.cafeto-mobile-column-header');
      filterOptions.each(function (index) {
        $(this).on('click', function () {
          sortTable(index);
        });
      });
    } else {
      const headers = table.find('thead th');
      headers.each(function (index) {
        $(this).on('click', function () {
          sortTable(index);
        });
      });
    }
    initializeData();
    updatePagination();
  }

  // Initialize desktop tables
  $('.cafeto-salaries-careers-table-desktop').each(function () {
    const blockId = $(this).attr('id');
    initSalariesTable(blockId, false);
  });

  // Initialize mobile tables
  $('.cafeto-salaries-careers-table-mobile').each(function () {
    const blockId = $(this).attr('id');
    initSalariesTable(blockId, true);
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map