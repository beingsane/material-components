import Component from 'vue-class-component';
import mdButton from '../button';
import mdIcon from '../icon';

var Velocity = require('velocity-animate');

@Component({
    props: {
        horizontal: {
            type: Boolean,
            required: false,
            'default': false
        },
        event: {
            type: String,
            required: false,
            'default': 'hover'
        }
    },
    components: {
        mdButton,
        mdIcon
    },
    template: require('./fab.html')
})
export default class Fab {
    private $el: any;
    private $els: any;

    private active: boolean;
    private horizontal: boolean;
    private event: string;

    data() {
        return {
            active: false
        }
    }

    ready() {
        if (this.event == 'hover') {
            this.$els.fab.addEventListener('mouseenter', this.open);
            this.$els.fab.addEventListener('mouseleave', this.close);
        }
        else {
            this.$els.fab.addEventListener(this.event, this.toggle);
        }
    }

    toggle() {
        if (!this.active) {
            this.open();
        }
        else {
            this.close();
        }
    }

    open() {
        if (!this.active) {
            this.active = true;

            var offsetY, offsetX;

            if (this.horizontal) {
                offsetX = 40;
            } else {
                offsetY = 40;
            }

            var items = Array.prototype.slice.call(this.$el.querySelectorAll('ul .btn-floating'));

            Velocity(items,
                {scaleY: ".4", scaleX: ".4", translateY: offsetY + 'px', translateX: offsetX + 'px'},
                {duration: 0});

            var time = 0;
            items.reverse().forEach(function (item) {
                Velocity(item,
                    {opacity: "1", scaleX: "1", scaleY: "1", translateY: "0", translateX: '0'},
                    {duration: 80, delay: time});
                time += 40;
            });
        }
    }

    close() {
        if (this.active) {
            this.active = false;

            var offsetY, offsetX;

            if (this.horizontal) {
                offsetX = 40;
            } else {
                offsetY = 40;
            }

            var items = Array.prototype.slice.call(this.$el.querySelectorAll('ul .btn-floating'));

            Velocity(items, "stop", true);
            Velocity(items,
                { opacity: "0", scaleX: ".4", scaleY: ".4", translateY: offsetY + 'px', translateX: offsetX + 'px'},
                { duration: 80 }
            );
        }
    }
}