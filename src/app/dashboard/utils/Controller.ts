import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

class Controller {
  constructor(
    public modalService: NgbModal
  ) {
  }

  protected open(content: any, options: any = { size: 'lg' }) {
    return this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', centered: true, size: options.size
    });
  }
}

export { Controller };
