/*
 * File: app/controller/Contacts.js
 *
 * This file was generated by Sencha Architect version 2.0.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Contact.controller.Contacts', {
    extend: 'Ext.app.Controller',
    config: {
        stores: [
            'ContactStore'
        ],

        refs: {
            contactinfo: {
                selector: 'contactinfo',
                xtype: 'contactinfo',
                autoCreate: true
            },
            contactform: {
                selector: 'contactform',
                xtype: 'contactform',
                autoCreate: true
            },
            contactlist: {
                selector: 'contactlist',
                xtype: 'contactlist',
                autoCreate: true
            }
        },

        control: {
            "button#addContactBtn": {
                tap: 'onAddContactBtnTap'
            },
            "button#saveContactBtn": {
                tap: 'onSaveContactBtnTap'
            },
            "button#editContactBtn": {
                tap: 'onEditContactBtnTap'
            },
            "button#cancelBtn": {
                tap: 'onCancelBtnTap'
            },
            "dataview": {
                itemtap: 'onContactItemTap'
            },
            "button#infoBackBtn": {
                tap: 'onInfoBackBtnTap'
            },
            "favoriteview": {
                activate: 'onFavoriteViewActivate'
            },
            "list": {
                activate: 'onListActivate'
            }
        }
    },

    onAddContactBtnTap: function(button, e, options) {
        var referrer = Ext.Viewport.getActiveItem();
        var form = this.getContactform();
        form.setRecord(null);
        form.reset();
        form.referrer = referrer;
        Ext.Viewport.setActiveItem(form);
    },

    onSaveContactBtnTap: function(button, e, options) {
        var form = this.getContactform();
        var errors = form.getValidationErrors();

        if (errors.length) {
            Ext.Msg.alert('Error', errors.join('<br/>'));
        } else {
            var values = form.getValues();
            var record = form.getRecord();
            if (record) {
                record.setData(values);
                record.commit();
                if (form.referrer.setInfo) {
                    form.referrer.setInfo(record);
                }
            } else {
                Ext.StoreManager.lookup('ContactStore').add(values);
            }
            Ext.Viewport.setActiveItem(form.referrer);
            delete form.referrer;
        }

    },

    onEditContactBtnTap: function(button, e, options) {
        var referrer = Ext.Viewport.getActiveItem();
        var form = this.getContactform();
        var info = this.getContactinfo();
        form.referrer = referrer;
        Ext.Viewport.setActiveItem(form);
        form.setRecord(info.getRecord());
    },

    onCancelBtnTap: function(button, e, options) {
        var form = this.getContactform();
        Ext.Viewport.setActiveItem(form.referrer);
        delete form.referrer;

    },

    onContactItemTap: function(dataview, index, target, record, e, options) {
        var info = this.getContactinfo();
        info.setInfo(record);
        Ext.Viewport.setActiveItem(info);

    },

    onInfoBackBtnTap: function(button, e, options) {
        Ext.Viewport.setActiveItem(0);
    },

    onFavoriteViewActivate: function(container, newActiveItem, oldActiveItem, options) {
        var ds = Ext.StoreManager.lookup('ContactStore');
        ds.filter('isFavorite', true);
    },

    onListActivate: function(container, newActiveItem, oldActiveItem, options) {
        var ds = Ext.StoreManager.lookup('ContactStore');
        ds.clearFilter();
    }

});