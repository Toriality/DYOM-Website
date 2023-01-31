export const add_states = {
  stringTargets: {
    inputComponent: [
      {
        name: "title",
        label: "Mission title",
        helper: "Insert the title of your missions. (Maximum of 64 characters)",
        len: 64,
      },
      {
        name: "author",
        label: "Mission author",
      },
      {
        name: "date",
        label: "Publish date",
      },
      {
        name: "summary",
        label:
          "Insert a short description for this mission. (Maximum of 256 characters)",
        len: 256,
      },
      {
        name: "trailer",
        label: "Enter a YouTube video for showcasing your mission.",
        len: 72,
      },
      {
        name: "credits",
        label: "Credit more people that helped to create this mission.",
        len: 256,
      },
      {
        name: "original",
        label:
          "Use this field to inform a more detailed name about the mission, or the full name of it if it is too long for the title field. (Maximum of 72 characters)",
        len: 72,
      },
      {
        name: "motto",
        label:
          "A slogan or a short text which serves to associate the plot of the mission or suggest the experience you'll have as a player. (Maximum of 72 characters)",
        len: 72,
      },
      {
        name: "theme",
        label: "Insert the title of the mission's original music theme if any.",
        len: 86,
      },
    ],
    textFieldComponent: [
      {
        name: "description",
        label:
          "Insert a in-depth description of your mission. (Maximum of 5,000 characters)",
        component: "TextField",
        len: 5000,
      },
    ],
  },
  inputTargets: [
    {
      name: "banner",
      accept: "image/png, image/jpeg",
      label: "Enter a banner image for you mission. (Maximum of 4 MB)",
      max: 4,
      multiple: false,
    },
    {
      name: "images",
      accept: "image/png, image/jpeg",
      label:
        "Enter images for the mission's gallery. (Maximum of 5 images, 4 MB each)",
      max: 4,
      multiple: true,
    },
    {
      name: "file",
      accept: ".dat, .zip, .rar",
      label: "Insert your mission's file here",
      max: 8,
      multiple: false,
    },
  ],
  selectTargets: [
    {
      name: "difficulty",
      label: "Enter the difficulty of the mission.",
      values: ["Unknown", "Easy", "Normal", "Hard", "Extreme"],
    },
  ],
  checkTargets: [
    {
      name: "mods",
    },
  ],
};

export const add_layout = {
  rows: [],
};
