import { inject, customAttribute, IViewModel } from 'aurelia';
import { constants } from '../common/constants';

@inject()
@customAttribute(`${constants.attributePrefix}-waves-effect`)
export class MdbWavesEffect implements IViewModel {

    constructor(private element: Element) {

    }

    beforeAttach() {

        this.element.addEventListener('click', this.click.bind(this));
    }
    beforeDetach() {
        this.element.removeEventListener('click', this.click);

    }

    private click(event: MouseEvent) {
        // event.stopPropagation();

        if (!this.element.classList.contains('disabled')) {

            const button = this.element;
            if (!button.classList.contains('waves-effect')) {
                button.className += ' waves-effect';
            }

            const xPos = event.clientX - button.getBoundingClientRect().left;
            const yPos = event.clientY - button.getBoundingClientRect().top;


            const tmp = document.createElement('div');
            tmp.className += 'waves-ripple waves-rippling';
            const ripple = button.appendChild(tmp);

            const top = yPos + 'px';
            const left = xPos + 'px';

            tmp.style.top = top;
            tmp.style.left = left;

            const scale = 'scale(' + ((button.clientWidth / 100) * 3) + ') translate(0,0)';

            tmp.style.webkitTransform = scale;
            tmp.style.transform = scale;
            tmp.style.opacity = '1';

            const duration = 750;

            tmp.style.webkitTransitionDuration = duration + 'ms';
            tmp.style.transitionDuration = duration + 'ms';


            this.removeRipple(button, ripple);
        }
    }

    private removeRipple(button: any, ripple: any) {
        ripple.classList.remove('waves-rippling');

        setTimeout(() => {
            ripple.style.opacity = '0';

            setTimeout(() => {
                button.removeChild(ripple);
            }, 750);
        }, 200);

    }
}