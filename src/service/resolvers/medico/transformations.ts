
import { SearchArgs, whereFilterType } from "../../utils/Interfaces/transformation";
import { SearchTransformationService } from "../../utils/services/SearchTransformationService";

const getWhereInMedicos = (args: whereFilterType, search: SearchArgs) => {
  const searchTransformation = new SearchTransformationService();

  return searchTransformation.getWhereConditions(
    args,
    search,
    undefined,
    undefined
  );
};

export { getWhereInMedicos };
