
/*
 *
 * ============================================================
 * WARNING: THIS FILE HAS BEEN COMMENTED OUT
 * ============================================================
 *
 * CONTEXT:
 *
 * The lifecycles.js file has been commented out to prevent unintended side effects when starting Strapi 5 for the first time after migrating to the document service.
 *
 * STRAPI 5 introduces a new document service that handles lifecycles differently compared to previous versions. Without migrating your lifecycles to document service middlewares, you may experience issues such as:
 *
 * - `unpublish` actions triggering `delete` lifecycles for every locale with a published entity, which differs from the expected behavior in v4.
 * - `discardDraft` actions triggering both `create` and `delete` lifecycles, leading to potential confusion.
 *
 * MIGRATION GUIDE:
 *
 * For a thorough guide on migrating your lifecycles to document service middlewares, please refer to the following link:
 * [Document Services Middlewares Migration Guide](https://docs.strapi.io/dev-docs/migration/v4-to-v5/breaking-changes/lifecycle-hooks-document-service)
 *
 * IMPORTANT:
 *
 * Simply uncommenting this file without following the migration guide may result in unexpected behavior and inconsistencies. Ensure that you have completed the migration process before re-enabling this file.
 *
 * ============================================================
 */

const nodemailer = require("nodemailer");
const {
  EMAIL_PASSWORD,
  EMAIL_TO_SEND,
  EMAIL_USED,
} = require("../../../../../constant.js");

module.exports = {
  beforeCreate(event) {
    const { params } = event;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USED,
        pass: EMAIL_PASSWORD,
      },
    });

    const sendMail = (mail) => {
      const emailOptions = {
        from: EMAIL_USED,
        to: EMAIL_TO_SEND,
        subject: mail.data.objet,
        text: `Utilisateur : ${mail.data.email}, 
      Message : ${mail.data.message}`,
      };

      transport.sendMail(emailOptions, (err) => {
        if (err) {
          console.error(err);
        }
      });
    };

    sendMail(params);
  },
};
