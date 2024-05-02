import { faker } from "@faker-js/faker";
import { icons } from "./seed_data.js";

export const getHashTags = (text) => {
  return text.match("#[p{L}0-9-_]+/ugi");
};

export const randomName = () => {
  const first_name = faker.person.firstName();
  const last_name = faker.person.lastName();
  const email = faker.internet.email({
    firstName: first_name,
    lastName: last_name,
  });
  const username = `${faker.word.adjective()}_${faker.word.noun()}`.replace(
    " ",
    ""
  );
  const icon_id = parseInt(Math.floor(Math.random() * icons.length) + 1);

  return {
    username: username,
    first_name: first_name,
    last_name: last_name,
    email: email,
    icon_id: icon_id,
  };
};
