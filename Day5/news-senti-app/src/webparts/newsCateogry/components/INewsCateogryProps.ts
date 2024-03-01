import { IData } from "../../data/IData";

export interface INewsCateogryProps {
  description: string;
  onDataChanged:(data:IData) => void;
}
