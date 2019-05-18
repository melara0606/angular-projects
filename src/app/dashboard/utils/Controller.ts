import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

class Controller {
  constructor(
    public modalService: NgbModal,
    public router?: Router
  ) { }

  protected open(content: any, options: any = { size: 'lg' }) {
    return this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', centered: true, size: options.size
    });
  }

  addClassContainerFluid() {
    document.getElementsByClassName('container-fluid')[0].classList.add('reset-container');
  }

  removeClassContainerFluid() {
    document.getElementsByClassName('container-fluid')[0].classList.remove('reset-container');
  }

  goTo(arrayRoutes: string[]) {
    this.router.navigate(arrayRoutes);
  }
}

export { Controller };
