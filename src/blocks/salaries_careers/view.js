// When the document is ready, we set up the behavior for both desktop and mobile tables.
document.addEventListener('DOMContentLoaded', function() {
    /**
     * Parses salary/table cell values for sorting ($65,000, 65,000, etc.).
     *
     * @param {string|number} value Raw cell value.
     * @return {number|null} Numeric value or null when not sortable as a number.
     */
    function parseSortableValue(value) {
        const raw = String(value ?? '').trim();
        if (!raw || /^(-|—|n\/a|null)$/i.test(raw)) {
            return null;
        }

        const normalized = raw.replace(/[^0-9.-]/g, '');
        if (normalized === '' || normalized === '-' || normalized === '.') {
            return null;
        }

        const num = parseFloat(normalized);
        return Number.isFinite(num) ? num : null;
    }

    /**
     * Compares two values for table sorting (numeric when possible, otherwise text).
     *
     * @param {string} aRaw First value.
     * @param {string} bRaw Second value.
     * @param {boolean} isAscending Sort direction.
     * @return {number} Sort order multiplier result.
     */
    function compareSortValues(aRaw, bRaw, isAscending) {
        const aStr = String(aRaw ?? '').trim();
        const bStr = String(bRaw ?? '').trim();
        const aNum = parseSortableValue(aStr);
        const bNum = parseSortableValue(bStr);
        const aIsNum = aNum !== null;
        const bIsNum = bNum !== null;

        let result = 0;
        if (aIsNum && bIsNum) {
            result = aNum - bNum;
        } else if (aIsNum && !bIsNum) {
            result = -1;
        } else if (!aIsNum && bIsNum) {
            result = 1;
        } else {
            result = aStr.localeCompare(bStr, undefined, { sensitivity: 'base', numeric: true });
        }

        return isAscending ? result : -result;
    }

    /**
     * Helper function to setup the entries select dropdown
     */
    function setupEntriesSelect(block, selectElement, isMobile) {
        if (!selectElement) return;
        const configEntriesAttr = block.getAttribute('data-entries-per-page');
        if (configEntriesAttr) {
            const configEntries = parseInt(configEntriesAttr);
            if (configEntries) {
                // Ensure the configured option exists
                let optionExists = Array.from(selectElement.options).some(opt => parseInt(opt.value) === configEntries);
                if (!optionExists) {
                    const newOption = document.createElement('option');
                    newOption.value = configEntries;
                    newOption.text = configEntries;

                    // Insert keeping numerical order
                    let inserted = false;
                    for (let i = 0; i < selectElement.options.length; i++) {
                        if (parseInt(selectElement.options[i].value) > configEntries) {
                            selectElement.insertBefore(newOption, selectElement.options[i]);
                            inserted = true;
                            break;
                        }
                    }
                    if (!inserted) {
                        selectElement.appendChild(newOption);
                    }
                }
                selectElement.value = configEntries;
            }
        }
    }

    /**
     * removeHeightFixedClasses
     * Removes the "height-fixed" classes from the main container (for both mobile and desktop),
     * taking into account that these classes might or might not be present.
     */
    function removeHeightFixedClasses(block) {
        const containers = block.querySelectorAll('.ventrix-table-container, .ventrix-mobile-table-container');
        const classesToRemove = ['height-fixed-mobile-salary-standard', 'height-fixed-mobile-salary-bridge', 'height-fixed-mobile-career-bridge', 'height-fixed-mobile-career-standard', 'height-fixed-mobile-career-double-row', 'height-fixed-desktop', 'height-fixed-mobile-salary-geo'];
        containers.forEach(container => {
            classesToRemove.forEach(cls => container.classList.remove(cls));
        });
    }

    /**
     * Initializes the new card-based mobile layout for salary-basic-table-mobile.
     * Keeps search, sort, and pagination behavior independent from table markup.
     */
    function initMobileCards(block) {
        const cardsContainer = block.querySelector('.cafeto-mobile-cards');
        const searchInput = block.querySelector('.cafeto-mobile-search-input');
        const entriesSelect = block.querySelector('.cafeto-mobile-entries-select');
        const prevPageBtn = block.querySelector('.cafeto-mobile-prev-page');
        const nextPageBtn = block.querySelector('.cafeto-mobile-next-page');
        const showingStart = block.querySelector('.cafeto-mobile-showing-start');
        const showingEnd = block.querySelector('.cafeto-mobile-showing-end');
        const totalEntriesElement = block.querySelector('.cafeto-mobile-total-entries');
        const sortButtons = block.querySelectorAll('.cafeto-mobile-sort-option');
        const hasPaginationUi = !!(prevPageBtn && nextPageBtn && showingStart && showingEnd && totalEntriesElement);

        if (!cardsContainer) {
            return;
        }

        const pinUnitedStates = block.dataset.pinUnitedStates !== '0';
        setupEntriesSelect(block, entriesSelect, true);
        let currentPage = 1;
        let entriesPerPage = entriesSelect ? (parseInt(entriesSelect.value) || 5) : Infinity;
        const allCards = Array.from(cardsContainer.querySelectorAll('.cafeto-mobile-card'));
        let fixedCard = null;
        const sortableCards = [];

        allCards.forEach(card => {
            if (pinUnitedStates && card.classList.contains('cafeto-us-row')) {
                fixedCard = card;
            } else {
                sortableCards.push(card);
            }
        });

        let filteredCards = sortableCards.slice();
        let currentSortKey = '';
        let isAscending = true;

        function matchesSearch(card, filter) {
            if (!filter) return true;
            const haystack = (card.dataset.search || card.textContent || '').toUpperCase();
            return haystack.indexOf(filter) > -1;
        }

        function sortCards() {
            if (!currentSortKey) return;

            filteredCards.sort((a, b) => {
                const aRaw = a.getAttribute(`data-sort-${currentSortKey}`) || '';
                const bRaw = b.getAttribute(`data-sort-${currentSortKey}`) || '';
                return compareSortValues(aRaw, bRaw, isAscending);
            });
        }

        function isFixedCardVisible(filter) {
            return fixedCard && matchesSearch(fixedCard, filter);
        }

        function renderCards() {
            const filter = searchInput ? searchInput.value.toUpperCase() : '';
            const fixedVisible = isFixedCardVisible(filter);
            const totalEntriesCount = filteredCards.length + (fixedVisible ? 1 : 0);
            const totalPages = hasPaginationUi ? (Math.ceil(totalEntriesCount / entriesPerPage) || 1) : 1;
            const safeCurrentPage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;
            currentPage = safeCurrentPage;

            const orderedCards = [];

            if (hasPaginationUi) {
                const pageRangeStart = (currentPage - 1) * entriesPerPage;
                const pageRangeEnd = currentPage * entriesPerPage;

                if (fixedVisible) {
                    orderedCards.push(fixedCard);
                }

                filteredCards.forEach((card, index) => {
                    const displayIndex = index + (fixedVisible ? 1 : 0);
                    if (displayIndex >= pageRangeStart && displayIndex < pageRangeEnd) {
                        orderedCards.push(card);
                    }
                });
            } else {
                if (fixedVisible) {
                    orderedCards.push(fixedCard);
                }
                orderedCards.push(...filteredCards);
            }

            allCards.forEach(card => {
                card.style.display = 'none';
            });

            orderedCards.forEach(card => {
                card.style.display = '';
                cardsContainer.appendChild(card);
            });

            const pageStart = hasPaginationUi ? (currentPage - 1) * entriesPerPage : 0;
            const pageEnd = hasPaginationUi ? currentPage * entriesPerPage : totalEntriesCount;
            const start = totalEntriesCount === 0 ? 0 : pageStart + 1;
            const end = Math.min(pageEnd, totalEntriesCount);
            if (hasPaginationUi) {
                showingStart.textContent = start;
                showingEnd.textContent = end;
                totalEntriesElement.textContent = totalEntriesCount;

                prevPageBtn.disabled = currentPage <= 1;
                nextPageBtn.disabled = currentPage >= totalPages || totalPages === 0;
                prevPageBtn.classList.toggle('enabled', !prevPageBtn.disabled);
                nextPageBtn.classList.toggle('enabled', !nextPageBtn.disabled);
            }
        }

        function applyFiltersAndSort() {
            const filter = searchInput ? searchInput.value.toUpperCase() : '';
            filteredCards = sortableCards.filter(card => matchesSearch(card, filter));
            sortCards();
            renderCards();
        }

        if (searchInput) {
            searchInput.addEventListener('input', function() {
                currentPage = 1;
                applyFiltersAndSort();
            });
        }

        if (entriesSelect) {
            entriesSelect.addEventListener('change', function() {
                entriesPerPage = parseInt(this.value) || 5;
                currentPage = 1;
                renderCards();
            });
        }

        if (hasPaginationUi) {
            prevPageBtn.addEventListener('click', function() {
                removeHeightFixedClasses(block);
                if (currentPage > 1) {
                    currentPage--;
                    renderCards();
                }
            });

            nextPageBtn.addEventListener('click', function() {
                removeHeightFixedClasses(block);
                const totalPages = Math.ceil(filteredCards.length / entriesPerPage) || 1;
                if (currentPage < totalPages) {
                    currentPage++;
                    renderCards();
                }
            });
        }

        sortButtons.forEach(button => {
            button.addEventListener('click', function() {
                const clickedKey = this.dataset.sortKey || '';
                if (!clickedKey) return;

                if (currentSortKey === clickedKey) {
                    isAscending = !isAscending;
                } else {
                    currentSortKey = clickedKey;
                    isAscending = true;
                }

                sortButtons.forEach(sortBtn => {
                    const icon = sortBtn.querySelector('.cafeto-sort-icon');
                    if (!icon) return;
                    icon.textContent = sortBtn.dataset.sortKey === currentSortKey ? (isAscending ? '\u2191\uFE0E' : '\u2193\uFE0E') : '\u2195\uFE0E';
                });

                currentPage = 1;
                sortCards();
                renderCards();
            });
        });

        applyFiltersAndSort();
    }


    /**
     * initSalariesTable
     * Initializes the salaries or careers table, handling both mobile and desktop versions.
     * @param {HTMLElement} block - The block container element.
     * @param {boolean} isMobile - Flag to handle mobile vs. desktop logic.
     */
    function initSalariesTable(block, isMobile) {
        if (!block) return;

        if (isMobile && block.querySelector('.cafeto-mobile-cards')) {
            initMobileCards(block);
            return;
        }

        // Use different selectors for mobile or desktop.
        const tableClass = isMobile ? '.cafeto-mobile-table' : '.ventrix-table';
        const table = block.querySelector(tableClass);
        if (!table) return;

        const searchInputClass = isMobile ? '.cafeto-mobile-search-input' : '.cafeto-search-input';
        const entriesSelectClass = isMobile ? '.cafeto-mobile-entries-select' : '.cafeto-entries-select';
        const prevPageBtnClass = isMobile ? '.cafeto-mobile-prev-page' : '.cafeto-prev-page';
        const nextPageBtnClass = isMobile ? '.cafeto-mobile-next-page' : '.cafeto-next-page';
        const showingStartClass = isMobile ? '.cafeto-mobile-showing-start' : '.cafeto-showing-start';
        const showingEndClass = isMobile ? '.cafeto-mobile-showing-end' : '.cafeto-showing-end';
        const totalEntriesClass = isMobile ? '.cafeto-mobile-total-entries' : '.cafeto-total-entries';

        const searchInput = block.querySelector(searchInputClass);
        const entriesSelect = block.querySelector(entriesSelectClass);
        const prevPageBtn = block.querySelector(prevPageBtnClass);
        const nextPageBtn = block.querySelector(nextPageBtnClass);
        const showingStart = block.querySelector(showingStartClass);
        const showingEnd = block.querySelector(showingEndClass);
        const totalEntriesElement = block.querySelector(totalEntriesClass);

        const hasPaginationUi = !!(prevPageBtn && nextPageBtn && showingStart && showingEnd && totalEntriesElement);

        const isDoubleRowDesktop = !isMobile && (
            block.classList.contains('is-template-salary-double-row-table-desktop')
            || block.classList.contains('is-template-career-double-row-table-desktop')
        );

        if (entriesSelect) {
            setupEntriesSelect(block, entriesSelect, isMobile);
        }

        let currentPage = 1;
        const configEntriesPerPage = parseInt(block.getAttribute('data-entries-per-page')) || (isMobile ? 5 : 10);
        let entriesPerPage = entriesSelect ? (parseInt(entriesSelect.value) || configEntriesPerPage) : configEntriesPerPage;
        let currentSortColumnIndex = -1;
        let sortAscending = true;

        // Store data for pagination and filtering
        let allEntries = [];
        let filteredEntries = [];
        // The fixed entry is for the "United States" row
        let fixedEntry = null;

        /**
         * Returns the sortable text for a grouped double-row entry.
         *
         * @param {{rows: HTMLElement[]}} entry Grouped table entry.
         * @param {number} columnIndex Column index from the table header.
         * @return {string}
         */
        function getDoubleRowSortValue(entry, columnIndex) {
            const firstRow = entry.rows[0];
            if (!firstRow) {
                return '';
            }

            if (columnIndex === 0) {
                const areaCell = firstRow.querySelector('td.is-col-area');
                return areaCell ? areaCell.textContent.trim() : '';
            }

            const dataCells = firstRow.querySelectorAll('td:not(.is-col-area)');
            const cell = dataCells[columnIndex - 1];
            return cell ? cell.textContent.trim() : '';
        }

        /**
         * Shows or hides every <tr> in a grouped double-row entry.
         *
         * @param {{rows: HTMLElement[]}} entry Grouped table entry.
         * @param {boolean} isVisible Whether the entry should be visible.
         * @param {string} displayMode CSS display value when visible.
         */
        function setDoubleRowEntryDisplay(entry, isVisible, displayMode) {
            entry.rows.forEach((row) => {
                row.style.display = isVisible ? displayMode : 'none';
            });
        }

        /**
         * Checks whether any row in a grouped entry matches the search filter.
         *
         * @param {{rows: HTMLElement[]}} entry Grouped table entry.
         * @param {string} filter Uppercase search string.
         * @return {boolean}
         */
        function doubleRowEntryMatchesFilter(entry, filter) {
            if (!filter) {
                return true;
            }

            return entry.rows.some((row) => {
                const tds = row.querySelectorAll('td');
                return Array.from(tds).some((td) => td.textContent.toUpperCase().indexOf(filter) > -1);
            });
        }

        /**
         * initializeData
         * Gathers rows or entries and identifies the fixed entry if present.
         */
        function initializeData() {
            if (isMobile) {
                const theads = table.querySelectorAll('thead');
                theads.forEach(entryHead => {
                    const entryBody = entryHead.nextElementSibling;

                    // Check if this is the fixed "United States" row
                    if (entryHead.classList.contains('cafeto-us-row') || (entryBody && entryBody.classList.contains('cafeto-us-row'))) {
                        fixedEntry = { head: entryHead, body: entryBody };
                    } else {
                        allEntries.push({ head: entryHead, body: entryBody });
                    }
                });
            } else if (isDoubleRowDesktop) {
                const rows = Array.from(table.querySelectorAll('tbody tr[data-area-group]'));
                const seenAreas = new Set();

                rows.forEach((row) => {
                    const area = row.dataset.areaGroup || '';
                    if (seenAreas.has(area)) {
                        return;
                    }

                    seenAreas.add(area);
                    const groupRows = rows.filter((groupRow) => groupRow.dataset.areaGroup === area);
                    const entry = { rows: groupRows, area };

                    if (row.classList.contains('cafeto-us-row')) {
                        fixedEntry = entry;
                    } else {
                        allEntries.push(entry);
                    }
                });
            } else {
                // For desktop, rows are in the tbody
                const rows = table.querySelectorAll('tbody tr');
                rows.forEach(row => {
                    // Check if it is the fixed row
                    if (row.classList.contains('cafeto-fixed-row') || row.classList.contains('cafeto-us-row')) {
                        fixedEntry = row;
                    } else {
                        allEntries.push(row);
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
            totalEntriesElement.textContent = total;
        }

        /**
         * isFixedEntryHidden
         * Checks if the fixed entry is hidden. Mobile version checks head; desktop checks row.
         */
        function isFixedEntryHidden() {
            if (isMobile) {
                return fixedEntry.head.classList.contains('ventrix-hidden');
            }

            if (isDoubleRowDesktop && fixedEntry && fixedEntry.rows) {
                return fixedEntry.rows[0].classList.contains('ventrix-hidden');
            }

            return fixedEntry.classList.contains('ventrix-hidden');
        }

        /**
         * filterTable
         * Filters the entries based on the text typed into the search input.
         */
        function filterTable() {
            const filter = searchInput ? searchInput.value.toUpperCase() : '';
            filteredEntries = [];

            if (isMobile) {
                allEntries.forEach(entry => {
                    let matchFound = false;

                    // Check in the head (Area)
                    const th = entry.head.querySelector('th');
                    const areaName = th ? th.textContent : '';
                    if (areaName.toUpperCase().indexOf(filter) > -1) {
                        matchFound = true;
                    } else {
                        // Check the body (other cells)
                        const tds = entry.body.querySelectorAll('td');
                        for (let td of tds) {
                            const cellText = td.textContent;
                            if (cellText.toUpperCase().indexOf(filter) > -1) {
                                matchFound = true;
                                break;
                            }
                        }
                    }

                    if (matchFound) {
                        filteredEntries.push(entry);
                        entry.head.classList.remove('ventrix-hidden');
                        entry.body.classList.remove('ventrix-hidden');
                    } else {
                        entry.head.classList.add('ventrix-hidden');
                        entry.body.classList.add('ventrix-hidden');
                    }
                });

                // Handle the fixed entry (United States row)
                if (fixedEntry) {
                    let matchFound = false;
                    const th = fixedEntry.head.querySelector('th');
                    const areaName = th ? th.textContent : '';
                    if (areaName.toUpperCase().indexOf(filter) > -1) {
                        matchFound = true;
                    } else {
                        const tds = fixedEntry.body.querySelectorAll('td');
                        for (let td of tds) {
                            const cellText = td.textContent;
                            if (cellText.toUpperCase().indexOf(filter) > -1) {
                                matchFound = true;
                                break;
                            }
                        }
                    }

                    if (matchFound) {
                        fixedEntry.head.classList.remove('ventrix-hidden');
                        fixedEntry.body.classList.remove('ventrix-hidden');
                    } else {
                        fixedEntry.head.classList.add('ventrix-hidden');
                        fixedEntry.body.classList.add('ventrix-hidden');
                    }
                }
            } else if (isDoubleRowDesktop) {
                allEntries.forEach((entry) => {
                    const matchFound = doubleRowEntryMatchesFilter(entry, filter);

                    if (matchFound) {
                        entry.rows.forEach((row) => row.classList.remove('ventrix-hidden'));
                        filteredEntries.push(entry);
                    } else {
                        entry.rows.forEach((row) => row.classList.add('ventrix-hidden'));
                    }
                });

                if (fixedEntry) {
                    const matchFound = doubleRowEntryMatchesFilter(fixedEntry, filter);
                    fixedEntry.rows.forEach((row) => {
                        row.classList.toggle('ventrix-hidden', !matchFound);
                    });
                }
            } else {
                // For desktop
                allEntries.forEach(row => {
                    let matchFound = false;

                    const tds = row.querySelectorAll('td');
                    for (let td of tds) {
                        const cellText = td.textContent;
                        if (cellText.toUpperCase().indexOf(filter) > -1) {
                            matchFound = true;
                            break;
                        }
                    }

                    if (matchFound) {
                        row.classList.remove('ventrix-hidden');
                        filteredEntries.push(row);
                    } else {
                        row.classList.add('ventrix-hidden');
                    }
                });

                // Handle the fixed entry
                if (fixedEntry) {
                    let matchFound = false;

                    const tds = fixedEntry.querySelectorAll('td');
                    for (let td of tds) {
                        const cellText = td.textContent;
                        if (cellText.toUpperCase().indexOf(filter) > -1) {
                            matchFound = true;
                            break;
                        }
                    }

                    if (matchFound) {
                        fixedEntry.classList.remove('ventrix-hidden');
                    } else {
                        fixedEntry.classList.add('ventrix-hidden');
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
            if (currentSortColumnIndex === n) {
                sortAscending = !sortAscending;
            } else {
                currentSortColumnIndex = n;
                sortAscending = true;
            }

            const isAscending = sortAscending;

            if (isMobile) {
                const headers = block.querySelectorAll('.cafeto-mobile-column-header');
                const th = headers[n];
                if (!th) return;

                const sortIcon = th.querySelector('.cafeto-sort-icon');
                if (!sortIcon) return;

                filteredEntries.sort(function(a, b) {
                    let aValue;
                    let bValue;

                    if (n === 0) {
                        const aThElement = a.head.querySelector('th');
                        const bThElement = b.head.querySelector('th');
                        aValue = aThElement ? aThElement.textContent : '';
                        bValue = bThElement ? bThElement.textContent : '';
                    } else {
                        const aTds = a.body.querySelectorAll('td');
                        const bTds = b.body.querySelectorAll('td');
                        const index = (n - 1) * 2 + 1;
                        aValue = aTds[index] ? aTds[index].textContent : '';
                        bValue = bTds[index] ? bTds[index].textContent : '';
                    }

                    return compareSortValues(aValue, bValue, isAscending);
                });

                const allSortIcons = block.querySelectorAll('.cafeto-mobile-column-header .cafeto-sort-icon');
                allSortIcons.forEach(icon => {
                    icon.textContent = '\u2195\uFE0E';
                });
                sortIcon.textContent = isAscending ? '\u2191\uFE0E' : '\u2193\uFE0E';

                renderMobileTable();
            } else if (isDoubleRowDesktop) {
                const headers = table.querySelectorAll('thead th');
                const th = headers[n];
                if (!th) return;

                const sortIcon = th.querySelector('.cafeto-sort-icon');
                if (!sortIcon) return;

                filteredEntries.sort(function(a, b) {
                    const aValue = getDoubleRowSortValue(a, n);
                    const bValue = getDoubleRowSortValue(b, n);
                    return compareSortValues(aValue, bValue, isAscending);
                });

                const allSortIcons = table.querySelectorAll('thead th .cafeto-sort-icon');
                allSortIcons.forEach(icon => {
                    icon.textContent = '\u2195\uFE0E';
                });
                sortIcon.textContent = isAscending ? '\u2191\uFE0E' : '\u2193\uFE0E';

                const tbody = table.querySelector('tbody');
                if (tbody) {
                    tbody.innerHTML = '';

                    if (fixedEntry) {
                        fixedEntry.rows.forEach((row) => tbody.appendChild(row));
                    }

                    filteredEntries.forEach((entry) => {
                        entry.rows.forEach((row) => tbody.appendChild(row));
                    });
                }
            } else {
                const headers = table.querySelectorAll('thead th');
                const th = headers[n];
                if (!th) return;

                const sortIcon = th.querySelector('.cafeto-sort-icon');
                if (!sortIcon) return;

                filteredEntries.sort(function(a, b) {
                    const aTds = a.querySelectorAll('td');
                    const bTds = b.querySelectorAll('td');
                    const aValue = aTds[n] ? aTds[n].textContent : '';
                    const bValue = bTds[n] ? bTds[n].textContent : '';

                    return compareSortValues(aValue, bValue, isAscending);
                });

                const allSortIcons = table.querySelectorAll('thead th .cafeto-sort-icon');
                allSortIcons.forEach(icon => {
                    icon.textContent = '\u2195\uFE0E';
                });
                sortIcon.textContent = isAscending ? '\u2191\uFE0E' : '\u2193\uFE0E';

                const tbody = table.querySelector('tbody');
                if (tbody) {
                    tbody.innerHTML = '';

                    if (fixedEntry) {
                        tbody.appendChild(fixedEntry);
                    }

                    filteredEntries.forEach(row => tbody.appendChild(row));
                }
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
            if (!hasPaginationUi) {
                // If there's no pagination UI, we don't need to hide/show rows for pages,
                // just show everything that matches the filter
                if (isMobile) {
                    allEntries.forEach(entry => {
                        if (filteredEntries.includes(entry)) {
                            entry.head.style.display = '';
                            entry.body.style.display = '';
                        } else {
                            entry.head.style.display = 'none';
                            entry.body.style.display = 'none';
                        }
                    });
                } else if (isDoubleRowDesktop) {
                    allEntries.forEach((entry) => {
                        const isVisible = filteredEntries.includes(entry);
                        setDoubleRowEntryDisplay(entry, isVisible, '');
                    });
                } else {
                    allEntries.forEach(row => {
                        if (filteredEntries.includes(row)) {
                            row.style.display = '';
                        } else {
                            row.style.display = 'none';
                        }
                    });
                }
                return;
            }

            const totalEntriesCount = filteredEntries.length + (fixedEntry && !isFixedEntryHidden() ? 1 : 0);
            const totalPages = Math.ceil(totalEntriesCount / entriesPerPage) || 1;

            if (isMobile) {
                let displayIndex = 0;

                // Show or hide fixed entry accordingly
                if (fixedEntry && !isFixedEntryHidden()) {
                    fixedEntry.head.style.display = '';
                    fixedEntry.body.style.display = '';
                    displayIndex = 1;
                } else if (fixedEntry) {
                    fixedEntry.head.style.display = 'none';
                    fixedEntry.body.style.display = 'none';
                }

                // Show only entries in the current page range
                filteredEntries.forEach((entry, index) => {
                    const idx = index + displayIndex;
                    if (idx >= (currentPage - 1) * entriesPerPage && idx < currentPage * entriesPerPage) {
                        entry.head.style.display = '';
                        entry.body.style.display = '';
                    } else {
                        entry.head.style.display = 'none';
                        entry.body.style.display = 'none';
                    }
                });
            } else if (isDoubleRowDesktop) {
                let displayIndex = 0;

                if (fixedEntry && !isFixedEntryHidden()) {
                    setDoubleRowEntryDisplay(fixedEntry, true, '');
                    displayIndex = 1;
                } else if (fixedEntry) {
                    setDoubleRowEntryDisplay(fixedEntry, false, 'none');
                }

                filteredEntries.forEach((entry, index) => {
                    const idx = index + displayIndex;
                    const isVisible = idx >= (currentPage - 1) * entriesPerPage && idx < currentPage * entriesPerPage;
                    setDoubleRowEntryDisplay(entry, isVisible, '');
                });
            } else {
                let displayIndex = 0;

                if (fixedEntry && !isFixedEntryHidden()) {
                    fixedEntry.style.display = '';
                    displayIndex = 1;
                } else if (fixedEntry) {
                    fixedEntry.style.display = 'none';
                }

                filteredEntries.forEach((row, index) => {
                    const idx = index + displayIndex;
                    if (idx >= (currentPage - 1) * entriesPerPage && idx < currentPage * entriesPerPage) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            }

            const start = totalEntriesCount === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1;
            const end = Math.min(currentPage * entriesPerPage, totalEntriesCount);

            // Update page info
            showingStart.textContent = start;
            showingEnd.textContent = end;
            totalEntriesElement.textContent = totalEntriesCount;

            // Manage previous page button
            if (currentPage === 1) {
                prevPageBtn.disabled = true;
                prevPageBtn.classList.remove('enabled');
            } else {
                prevPageBtn.disabled = false;
                prevPageBtn.classList.add('enabled');
            }

            // Manage next page button
            if (currentPage >= totalPages || totalPages === 0) {
                nextPageBtn.disabled = true;
                nextPageBtn.classList.remove('enabled');
            } else {
                nextPageBtn.disabled = false;
                nextPageBtn.classList.add('enabled');
            }
        }

        /**
         * renderMobileTable
         * Reconstructs the mobile table with sorted or filtered entries.
         */
        function renderMobileTable() {
            table.innerHTML = '';

            if (fixedEntry && !isFixedEntryHidden()) {
                table.appendChild(fixedEntry.head);
                table.appendChild(fixedEntry.body);
            }

            filteredEntries.forEach(entry => {
                table.appendChild(entry.head);
                table.appendChild(entry.body);
            });

            updatePagination();
        }

        // --- Event handlers ---

        if (searchInput) {
            // Search input changes
            searchInput.addEventListener('input', function() {
                removeHeightFixedClasses(block);
                currentPage = 1;
                filterTable();
            });
        }

        if (entriesSelect) {
            // Changing the number of entries
            entriesSelect.addEventListener('change', function() {
                removeHeightFixedClasses(block);
                entriesPerPage = parseInt(this.value) || configEntriesPerPage;
                currentPage = 1;
                updatePagination();
            });
        }

        if (hasPaginationUi) {
            // Previous page button
            prevPageBtn.addEventListener('click', function() {
                removeHeightFixedClasses(block);
                if (currentPage > 1) {
                    currentPage--;
                    updatePagination();
                }
            });

            // Next page button
            nextPageBtn.addEventListener('click', function() {
                removeHeightFixedClasses(block);
                const totalPages = Math.ceil((filteredEntries.length + (fixedEntry && !isFixedEntryHidden() ? 1 : 0)) / entriesPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    updatePagination();
                }
            });
        }

        // Sorting headers on click (in Spanish "Ordenar al hacer clic en headers")
        if (isMobile) {
            const filterOptions = block.querySelectorAll('.cafeto-mobile-column-header');
            filterOptions.forEach((header, index) => {
                header.addEventListener('click', function() {
                    removeHeightFixedClasses(block);
                    sortTable(index);
                });
            });
        } else {
            const headers = table.querySelectorAll('thead th');
            headers.forEach((header, index) => {
                header.addEventListener('click', function() {
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
    const desktopTables = document.querySelectorAll('.cafeto-salaries-careers-table-desktop');
    desktopTables.forEach(block => {
        initSalariesTable(block, false);
    });

    // Initialize all mobile tables
    const mobileTables = document.querySelectorAll('.cafeto-salaries-careers-table-mobile');
    mobileTables.forEach(block => {
        initSalariesTable(block, true);
    });
});
