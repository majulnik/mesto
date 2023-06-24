        const waitEscapeFunction = function (evt) {
            if (evt.key == 'Escape') {
              const popup = document.querySelector('.popup_opened');
              closeModal(popup);
            }
          }
          
          function openModal(popup) {
            popup.classList.add('popup_opened');
            document.addEventListener('keydown', waitEscapeFunction);
          }
          
          function closeModal(popup) {
            popup.classList.remove('popup_opened');
            document.removeEventListener('keydown', waitEscapeFunction);
          }

          export { waitEscapeFunction, openModal, closeModal }