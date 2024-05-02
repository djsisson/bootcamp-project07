import { faker } from "@faker-js/faker";
import { icons } from "./seed_data.js";

export const getHashTags = (text) => {
  return text.match("#[p{L}0-9-_]+");
};

export const randomName = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({
    firstName: firstName,
    lastName: lastName,
  });
  const userName = `${faker.word.adjective()}_${faker.word.noun()}`.replace(
    " ",
    ""
  );
  const icon = parseInt(Math.floor(Math.random() * icons.length) + 1);

  return {
    firstName: firstName,
    lastName: lastName,
    email: email,
    userName: userName,
    icon: icon,
  };
};
