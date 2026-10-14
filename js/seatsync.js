/**
 * SEAT-SYNC ARCHITECTURE MODAL CONTROLLER
 * Project developed for St. Joseph's College of Engineering and Technology (SJCET Palai)
 */

(function () {
    'use strict';

    function initSeatSync() {
        const modalOverlay = document.getElementById('seatSyncModal');
        const closeBtn = document.getElementById('seatSyncModalClose');
        const footerCloseBtn = document.getElementById('seatSyncModalFooterClose');

        if (!modalOverlay) return;

        window.openSeatSyncModal = function () {
            modalOverlay.style.display = 'flex';
            // force reflow for smooth opacity transition
            void modalOverlay.offsetHeight;
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        window.closeSeatSyncModal = function () {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(function () {
                if (!modalOverlay.classList.contains('active')) {
                    modalOverlay.style.display = '';
                }
            }, 300);
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', window.closeSeatSyncModal);
        }

        if (footerCloseBtn) {
            footerCloseBtn.addEventListener('click', window.closeSeatSyncModal);
        }

        // Close on clicking backdrop
        modalOverlay.addEventListener('click', function (e) {
            if (e.target === modalOverlay) {
                window.closeSeatSyncModal();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                window.closeSeatSyncModal();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSeatSync);
    } else {
        initSeatSync();
    }
})();
