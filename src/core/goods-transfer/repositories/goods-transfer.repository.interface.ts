import { IPurchasingRepository } from '../../purchasing/repositories/purchasing.repository.interface';

export interface IGoodsTransferRepository extends IPurchasingRepository {}

export const GOODS_TRANSFER_REPOSITORY = 'GOODS_TRANSFER_REPOSITORY';
