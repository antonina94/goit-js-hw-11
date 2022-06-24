export default class LoadMoreBtn {
    constructor({ selector, hidden = false }) {
      this.refs = this.getRefs(selector);

      if(hidden){
        this.hide()
      }
    }
  
    getRefs(selector) {
      const refs = {};
      refs.button = document.querySelector(selector);
    
  
      return refs;
    }
  
    enable() {
      this.refs.button.disabled = false;
    
    }
  
    disable() {
      this.refs.button.disabled = true;
    //   this.refs.label.textContent = 'Загружаем...';
    //   this.refs.spinner.classList.remove('is-hidden');
    }
  
    show() {
      this.refs.button.classList.remove('hidden');
    }
  
    hide() {
      this.refs.button.classList.add('hidden');
    }
  }
  