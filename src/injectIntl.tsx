import { Component, createElement } from 'react';
import { injectIntl as injectIntlReact } from 'react-intl'
import { escapeId } from './functions'
import React = require('react');

export function injectIntl(WrappedComponent, options = {}) {
    class InjectPhrase extends Component {
        constructor(props, context) {
            super(props, context);
            this.render = this.render.bind(this);
            this.translate = this.translate.bind(this);

            this.state = { errors: {} };
        }

        translate(keyName: string) {
            if (!window['PHRASEAPP_DISABLED']) {
                let escapedString = keyName.replace("<", "[[[[[[html_open]]]]]]").replace(">", "[[[[[[html_close]]]]]]");
                return escapeId(escapedString);
            } else {
                return this.props['intl'].formatMessage({ "id": keyName })
            }
        }

        render() {
            return (
                <WrappedComponent
                    errors={this.state['errors']}
                    translate={this.translate}
                    {...this.props}
                />
            );
        }
    }

    return injectIntlReact(InjectPhrase, options);
}