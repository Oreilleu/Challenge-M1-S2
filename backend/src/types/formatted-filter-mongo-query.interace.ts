import { Filter } from "./filter.interface";

export interface FormattedFilterMongoQuery {
  "variations.filters.name": Filter["name"];
  "variations.filters.value": Filter["value"];
}
