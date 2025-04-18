
import { SearchArgs, whereFilterType } from "../../utils/Interfaces/transformation";
import { SearchTransformationService } from "../../utils/services/SearchTransformationService";

const getWhereInPacientes = (args: whereFilterType, search: SearchArgs) => {
  const searchTransformation = new SearchTransformationService();

  return searchTransformation.getWhereConditions(
    args,
    search,
    undefined,
    undefined
  );
};

export { getWhereInPacientes };
