/*
 * @Date: 2022-10-08 14:15:33
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-12-05 15:10:29
 * @Description: 业务类型声明
 */

interface Popup {
  open: boolean;
  value: any;
}
interface ResourcesMap {
  main: Resources;
  others: Resources[];
}
interface Resources {
  id: string;
  name: string;
  pavilionDto: PavilionDto;
  synopsis: string;
  url: string;
}

interface PavilionDto {
  repositoryId: string;
  id: string;
  name: string;
  contact: string;
  phone: string;
}
