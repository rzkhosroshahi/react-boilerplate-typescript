/**
 * modules Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a modules',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the base component type:',
      default: 'Stateless Function',
      choices: () => [
        'Stateless Function',
        'React.PureComponent',
        'React.Component',
      ],
    },
    {
      type: 'confirm',
      name: 'wantHeaders',
      default: false,
      message: 'Do you want headers?',
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container or modules or page with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'wantMessages',
      default: true,
      message: 'Do you want i18n messages (i.e. will this component use text)?',
    },
    {
      type: 'confirm',
      name: 'wantSaga',
      default: true,
      message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)',
    },
    {
      type: 'confirm',
      name: 'wantTypes',
      default: true,
      message: 'Do you want to have types.d.ts file',
    },
  ],
  actions: data => {
    // add component
    let componentTemplate; // eslint-disable-line no-var

    switch (data.type) {
      case 'Stateless Function': {
        componentTemplate = './modules/stateless.js.hbs';
        break;
      }
      default: {
        componentTemplate = './modules/class.js.hbs';
      }
    }

    const actions = [
      {
        type: 'add',
        path: '../../app/components/{{properCase name}}/index.tsx',
        templateFile: componentTemplate,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/components/{{properCase name}}/tests/index.test.ts',
        templateFile: './modules/test.js.hbs',
        abortOnFail: true,
      },
    ];

    // Actions
    actions.push({
      type: 'add',
      path: '../../app/modules/{{properCase name}}/actions.ts',
      templateFile: './modules/actions.js.hbs',
      abortOnFail: true,
    });
    actions.push({
      type: 'add',
      path: '../../app/modules/{{properCase name}}/tests/actions.test.ts',
      templateFile: './modules/actions.test.js.hbs',
      abortOnFail: true,
    });

    // Constants
    actions.push({
      type: 'add',
      path: '../../app/modules/{{properCase name}}/constants.ts',
      templateFile: './modules/constants.js.hbs',
      abortOnFail: true,
    });

    // Selectors
    actions.push({
      type: 'add',
      path: '../../app/modules/{{properCase name}}/selectors.ts',
      templateFile: './modules/selectors.js.hbs',
      abortOnFail: true,
    });
    actions.push({
      type: 'add',
      path: '../../app/modules/{{properCase name}}/tests/selectors.test.ts',
      templateFile: './modules/selectors.test.js.hbs',
      abortOnFail: true,
    });

    // Reducer
    actions.push({
      type: 'add',
      path: '../../app/modules/{{properCase name}}/reducer.ts',
      templateFile: './modules/reducer.js.hbs',
      abortOnFail: true,
    });
    actions.push({
      type: 'add',
      path: '../../app/modules/{{properCase name}}/tests/reducer.test.ts',
      templateFile: './modules/reducer.test.js.hbs',
      abortOnFail: true,
    });

    if (data.wantSaga) {
      actions.push({
        type: 'add',
        path: '../../app/modules/{{properCase name}}/saga.ts',
        templateFile: './modules/saga.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/modules/{{properCase name}}/tests/saga.test.ts',
        templateFile: './modules/saga.test.js.hbs',
        abortOnFail: true,
      });
    }
    if (data.wantTypes) {
      actions.push({
        type: 'add',
        path: '../../app/modules/{{properCase name}}/types.d.ts',
        templateFile: './modules/types.js.hbs',
        abortOnFail: true,
      });
    }

    // If component wants messages
    if (data.wantMessages) {
      actions.push({
        type: 'add',
        path: '../../app/modules/{{properCase name}}/messages.ts',
        templateFile: './modules/messages.js.hbs',
        abortOnFail: true,
      });
    }

    return actions;
  },
};
