import React from 'react';
import { useSelector } from "react-redux";
import { CheckoutModal } from './checkoutmodal';
import { CheckoutModal1 } from './checkoutmodal1';
import { PurchaseCompleted } from './purchase-completed';
import { PurchaseCompleted1 } from './purchase-completed1';
import { BoxTransferModal } from './mystery-box-transfer';
import { BoxOpenModal } from './mystery-box-open';
import { SetPriceModal } from './setPriceModal';
import { DepositModal } from './depositmodal';
import { DepositSuccessfulModal } from './deposit-successful';
import { CoinClaimedModal } from './coin-claimed';
import { UpgardePromptModal } from './upgradePrompt';
import { SellItemModal } from './sell-item';
import { SellRequestCompleted } from './sell-request-completed';
import { LowerPriceModal } from './lowerpricemodal';
import { CancelSaleModal } from './cancel-sale-modal';
import { BoxTransferPending } from './box-transfer-pending';
import { RegisterModal } from './registermodal';
import { DownloadMetaMask } from './downloadmetamask';
import { SwitchNetworkModal } from './switchnetworkmodal';
import { LoginRegisterModal } from './loginregistermodal';
import { WalletConnect } from './walletconnectmodal';
import { NftCheckoutModal } from "./nft-checkoutmodal";
import { NftCheckoutModal1 } from "./nft-checkoutmodal1";
import { NftPurchaseCompleted } from "./nft-purchasecomplete";
import { NftWarningModal } from "./nft-warningmodal";
import { CheckoutUpgradeModal } from "./checkout-upgrade";
import { ModalType } from "../../core";

export default function Modal() {
  const modal = useSelector((state) => state.ui.modal)
  return (
    <>
      {modal[ModalType.CheckoutModal] && <CheckoutModal />}
      {modal[ModalType.CheckoutModal1] && <CheckoutModal1 />}
      {modal[ModalType.PurchaseCompleted] && <PurchaseCompleted />}
      {(modal[ModalType.PurchaseCompleted1] || modal[ModalType.ChooseAvatarModal]) && <PurchaseCompleted1 />}
      {modal[ModalType.BoxTransferModal] && <BoxTransferModal />}
      {modal[ModalType.BoxOpenModal] && <BoxOpenModal />}
      {modal[ModalType.SetPriceModal] && <SetPriceModal />}
      {(modal[ModalType.DepositModal] || modal[ModalType.DepositVrhModal]) && <DepositModal />}
      {modal[ModalType.DepositSuccessfulModal] && <DepositSuccessfulModal />}
      {modal[ModalType.CoinClaimedModal] && <CoinClaimedModal />}
      {modal[ModalType.UpgardePromptModal] && <UpgardePromptModal />}
      {modal[ModalType.SellItemModal] && <SellItemModal />}
      {modal[ModalType.SellRequestCompleted] && <SellRequestCompleted />}
      {modal[ModalType.LowerPriceModal] && <LowerPriceModal />}
      {modal[ModalType.CancelSaleModal] && <CancelSaleModal />}
      {modal[ModalType.BoxTransferPending] && <BoxTransferPending />}
      {(modal[ModalType.RegisterModal] || modal[ModalType.LoginModal]) && <RegisterModal />}
      {modal[ModalType.DownloadMetaMask] && <DownloadMetaMask />}
      {modal[ModalType.SwitchNetworkModal] && <SwitchNetworkModal />}
      {modal[ModalType.LoginRegisterModal] && <LoginRegisterModal />}
      {modal[ModalType.WalletConnectModal] && <WalletConnect />}
      {modal[ModalType.NftCheckoutModal] && <NftCheckoutModal />}
      {modal[ModalType.NftCheckoutModal1] && <NftCheckoutModal1 />}
      {modal[ModalType.NftPurchaseCompleted] && <NftPurchaseCompleted />}
      {(modal[ModalType.NftWarningModal] || modal[ModalType.OpenBoxModal]) && <NftWarningModal />}
      {modal[ModalType.CheckoutUpgradeModal] && <CheckoutUpgradeModal />}
    </>
  )
}
