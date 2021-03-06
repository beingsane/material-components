import Component from 'vue-class-component';

@Component({
    props: {
        opened: {
            required: false,
        },
        popout: {
            type: Boolean,
            required: false,
            'default': false,
            twoWay: false
        },
        expendable: {
            type: Boolean,
            required: false,
            'default': false,
            twoWay: false
        }
    },
    watch: {
        expendable: function () {
            console.log('Error: can not change expandable')
        },
        opened: {
            deep: true,
            handler: function (newValue, oldValue) {
                this.openedChanged(newValue, oldValue)
            }
        }
    },
    events: {
        'collapsible::open': function (id) {
            return this.open(id);
        },
        'collapsible::close': function (id) {
           return this.close(id);
        }
    },
    template: require('./collapsible.html')
})
export default class Collapsible {
    private $children: any;
    private $broadcast: any;

    private expendable: boolean;
    private opened: any;

    ready() {
        if (typeof this.opened != "undefined") {
            if (this.expendable) {
                this.opened
                    .forEach((id) => this.$broadcast('collapsible::open', id, this.expendable));
            }
            else {
                this.$broadcast('collapsible::open', this.opened, this.expendable);
            }
        }
    }

    open(id: string) {
        if (typeof this.opened != "undefined") {
            if (this.expendable) {
                this.opened.push(id);
            }
            else {
                this.opened = id;
            }
        }
        // propagate event to children
        this.$broadcast('collapsible::open', id, this.expendable);
        return true;
    }

    close(id: string) {
        if (typeof this.opened != "undefined") {
            if (this.expendable) {
                this.opened.$remove(id);
            }
            else {
                this.opened = '';
            }
        }
        // propagate event to children
        this.$broadcast('collapsible::close', id);
        return true;
    }

    openedChanged(value) {
        if (this.expendable) {
            var ids = this.$children
                .filter((component) => component.$options.name == 'CollapsibleItem')
                .map((item) => item.id);
            // close
            ids
                .filter((val) => value.indexOf(val) < 0)
                .forEach((id) => this.$broadcast('collapsible::close', id));
            // open
            this.opened = value;
            this.opened
                .forEach((id) => this.$broadcast('collapsible::open', id, this.expendable));
        }
        else {
            this.$broadcast('collapsible::open', value, this.expendable);
        }
    }
}