import { defineConfig } from "tinacms";
import moment from 'moment';

// Your hosting provider likely exposes this as an environment variable
const BRANCH = "main";
const CLIENT_ID = "014b5c61-c8b3-4ee8-9213-bef2802bde08";
const TOKEN = "014b5c61-c8b3-4ee8-9213-bef2802bde08";

export default defineConfig({
  branch: BRANCH,
  clientId: CLIENT_ID, // Get this from tina.io
  token: TOKEN, // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "",
  },
  media: {
    tina: {
      mediaRoot: "medias",
      publicFolder: "",
    },
  },
  schema: {
    collections: [
      {
        name: "posts",
        label: "Posts",
        path: "_posts",
        ui: {
          defaultItem: {
            date: moment(new Date()).format('YYYY-MM-DD'),
            layout: "post",
          },
          filename: {
            readOnly: true,
            slugify: values => {
              return `${values?.date?.substring(0, 10) ||
                'xxxx'}-${values?.title?.toLowerCase().replace(/[^\w\s]/gi, '').replace(/ /g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, "")}`
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            label: "Date",
            name: "date",
            type: "datetime",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            label: 'Layout',
            name: 'layout',
            type: 'string',
            required: true,
            ui: { component: 'hidden' },
          },
        ],
      },
    ],
  },
});
