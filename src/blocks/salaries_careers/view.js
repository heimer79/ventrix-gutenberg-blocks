// When the document is ready, we set up the behavior for both desktop and mobile tables.
document.addEventListener('DOMContentLoaded', function() {
    /**
     * Helper function to check if a value is numeric
     */
    function isNumeric(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
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
        const classesToRemove = ['height-fixed-mobile-salary-standard', 'height-fixed-mobile-career-bridge', 'height-fixed-mobile-career-standard', 'height-fixed-desktop', 'height-fixed-mobile-salary-geo'];
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

        if (!cardsContainer || !searchInput) {
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

        function parseSortableValue(value) {
            const normalized = String(value ?? '').replace(/[^\d.-]/g, '');
            return normalized === '' ? null : parseFloat(normalized);
        }

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
                const aNum = parseSortableValue(aRaw);
                const bNum = parseSortableValue(bRaw);

                if (aNum !== null && bNum !== null && !isNaN(aNum) && !isNaN(bNum)) {
                    return isAscending ? aNum - bNum : bNum - aNum;
                }

                return isAscending
                    ? aRaw.localeCompare(bRaw, undefined, { sensitivity: 'base' })
                    : bRaw.localeCompare(aRaw, undefined, { sensitivity: 'base' });
            });
        }

        function isFixedCardVisible(filter) {
            return fixedCard && matchesSearch(fixedCard, filter);
        }

        function renderCards() {
            const filter = searchInput.value.toUpperCase();
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
            const filter = searchInput.value.toUpperCase();
            filteredCards = sortableCards.filter(card => matchesSearch(card, filter));
            sortCards();
            renderCards();
        }

        searchInput.addEventListener('input', function() {
            currentPage = 1;
            applyFiltersAndSort();
        });

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
                    icon.textContent = sortBtn.dataset.sortKey === currentSortKey ? (isAscending ? '↑' : '↓') : '↕';
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
     * @param {string} blockId - The ID of the block container.
     * @param {boolean} isMobile - Flag to handle mobile vs. desktop logic.
     */
    function initSalariesTable(blockId, isMobile) {
        const block = document.getElementById(blockId);
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

        if (!searchInput || !entriesSelect || !prevPageBtn || !nextPageBtn || !showingStart || !showingEnd || !totalEntriesElement) {
            return;
        }

        setupEntriesSelect(block, entriesSelect, isMobile);

        let currentPage = 1;
        let entriesPerPage = parseInt(entriesSelect.value) || (isMobile ? 5 : 10);

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
            } else {
                return fixedEntry.classList.contains('ventrix-hidden');
            }
        }

        /**
         * filterTable
         * Filters the entries based on the text typed into the search input.
         */
        function filterTable() {
            const filter = searchInput.value.toUpperCase();
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
            let isAscending;

            if (isMobile) {
                // For mobile, we handle the icons differently
                const headers = block.querySelectorAll('.cafeto-mobile-column-header');
                const th = headers[n];
                if (!th) return;

                const sortIcon = th.querySelector('.cafeto-sort-icon');
                if (!sortIcon) return;

                isAscending = sortIcon.textContent === '↓';
                sortIcon.textContent = isAscending ? '↑' : '↓';

                filteredEntries.sort(function(a, b) {
                    let aValue, bValue;

                    if (n === 0) {
                        // Sorting by 'Area' (located in <thead>)
                        const aThElement = a.head.querySelector('th');
                        const bThElement = b.head.querySelector('th');
                        aValue = aThElement ? aThElement.textContent : '';
                        bValue = bThElement ? bThElement.textContent : '';
                    } else {
                        // Sorting by other columns in the body
                        const aTds = a.body.querySelectorAll('td');
                        const bTds = b.body.querySelectorAll('td');
                        const index = (n - 1) * 2 + 1;
                        aValue = aTds[index] ? aTds[index].textContent : '';
                        bValue = bTds[index] ? bTds[index].textContent : '';
                    }

                    if (isNumeric(aValue) && isNumeric(bValue)) {
                        return isAscending ? parseFloat(aValue) - parseFloat(bValue) : parseFloat(bValue) - parseFloat(aValue);
                    } else {
                        return isAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                    }
                });

                // Reset other sort icons
                const allSortIcons = block.querySelectorAll('.cafeto-mobile-column-header .cafeto-sort-icon');
                allSortIcons.forEach(icon => icon.textContent = '↕');
                // Set the chosen icon
                sortIcon.textContent = isAscending ? '↑' : '↓';

                // Re-render after sorting
                renderMobileTable();
            } else {
                // For desktop
                const headers = table.querySelectorAll('thead th');
                const th = headers[n];
                if (!th) return;

                const sortIcon = th.querySelector('.cafeto-sort-icon');
                if (!sortIcon) return;

                isAscending = sortIcon.textContent === '↓';
                sortIcon.textContent = isAscending ? '↑' : '↓';

                filteredEntries.sort(function(a, b) {
                    const aTds = a.querySelectorAll('td');
                    const bTds = b.querySelectorAll('td');
                    const aValue = aTds[n] ? aTds[n].textContent : '';
                    const bValue = bTds[n] ? bTds[n].textContent : '';

                    if (isNumeric(aValue) && isNumeric(bValue)) {
                        return isAscending ? parseFloat(aValue) - parseFloat(bValue) : parseFloat(bValue) - parseFloat(aValue);
                    } else {
                        return isAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                    }
                });

                // Reset other sort icons
                const allSortIcons = table.querySelectorAll('thead th .cafeto-sort-icon');
                allSortIcons.forEach(icon => icon.textContent = '↕');
                // Set the chosen icon
                sortIcon.textContent = isAscending ? '↑' : '↓';

                // Re-render by appending rows again
                const tbody = table.querySelector('tbody');
                if (tbody) {
                    tbody.innerHTML = '';

                    // If there's a fixed entry, append it first
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
            const fixedEntryCount = fixedEntry && !isFixedEntryHidden() ? 1 : 0;
            const totalEntriesCount = filteredEntries.length + fixedEntryCount;
            const totalPages = Math.ceil(totalEntriesCount / entriesPerPage);

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

        // Search input changes (in Spanish was "Búsqueda" -> "Search")
        searchInput.addEventListener('input', function() {
            removeHeightFixedClasses(block);
            currentPage = 1;
            filterTable();
        });

        // Changing the number of entries (in Spanish "Cambio de número de entradas" -> "Changing the number of entries")
        entriesSelect.addEventListener('change', function() {
            removeHeightFixedClasses(block);
            entriesPerPage = parseInt(this.value) || (isMobile ? 5 : 10);
            currentPage = 1;
            updatePagination();
        });

        // Previous page button (in Spanish "Botón página anterior")
        prevPageBtn.addEventListener('click', function() {
            removeHeightFixedClasses(block);
            if (currentPage > 1) {
                currentPage--;
                updatePagination();
            }
        });

        // Next page button (in Spanish "Botón página siguiente")
        nextPageBtn.addEventListener('click', function() {
            removeHeightFixedClasses(block);
            const totalPages = Math.ceil((filteredEntries.length + (fixedEntry && !isFixedEntryHidden() ? 1 : 0)) / entriesPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                updatePagination();
            }
        });

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
    desktopTables.forEach(table => {
        const blockId = table.getAttribute('id');
        if (blockId) {
            initSalariesTable(blockId, false);
        }
    });

    // Initialize all mobile tables
    const mobileTables = document.querySelectorAll('.cafeto-salaries-careers-table-mobile');
    mobileTables.forEach(table => {
        const blockId = table.getAttribute('id');
        if (blockId) {
            initSalariesTable(blockId, true);
        }
    });
});
