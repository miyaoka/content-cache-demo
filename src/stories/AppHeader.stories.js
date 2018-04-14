import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import { withKnobs, object, number } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import AppHeader from '~/components/AppHeader.vue'

const repoOwner = 'owner'
const repoName = 'project'

storiesOf('AppHeader', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<AppHeader />`,
        components: { AppHeader },
        render: (h) => h(AppHeader, { props: { repoOwner, repoName } })
      }
    })
  )
