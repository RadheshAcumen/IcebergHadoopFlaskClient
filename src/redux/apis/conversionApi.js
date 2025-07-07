import { api } from "./api";

export const ConversionBigqueryToIceberg = (formData) => {
  return api.post(`/iceberg-to-big-query-conversion`, formData);
};

export const ConversionDataFilesToIceberg = (formData) => {
  return api.post(`/convert`, formData);
};

export const ConversionPostgresToIceberg = (formData) => {
  return api.post(`/postgres_to_iceberg`, formData);
};