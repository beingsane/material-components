import Component from 'vue-class-component';

var template = require('./dropdown-item.html');

@Component({
    props: {
        closing: {
            type: Boolean,
            required: false,
            "default": true
        }
    },
    template: template
})
export default class DropdownItem {
    private closing: boolean;

    data() {
        return {
        }
    }

    closeIfEnable() {
        if (this.closing) {
            var self: any = this;
            self.$dispatch("dropdown::close");
        }
    }
}