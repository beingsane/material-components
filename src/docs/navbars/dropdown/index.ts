import Component from 'vue-class-component';

import mdBadge from '../../../components/badge';
import mdNavbar from '../../../components/navbar';
import mdNavItem from '../../../components/nav-item';
import mdDropdown from '../../../components/dropdown';
import mdDropdownItem from '../../../components/dropdown-item';
import mdDropdownList from '../../../components/dropdown-list';
import mdIcon from '../../../components/icon';

import events from '../../../mixins/events';

@Component({
    components: {
        mdBadge,
        mdNavbar,
        mdNavItem,
        mdDropdown,
        mdDropdownItem,
        mdDropdownList,
        mdIcon
    },
    mixins: [
        events
    ],
    template: require('./navbars.html')
})
export default class DropdownNavbar {
}