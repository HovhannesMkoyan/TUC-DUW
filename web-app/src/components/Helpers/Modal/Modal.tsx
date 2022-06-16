import { Modal } from "@mantine/core";
import "./Modal.css";

export default ({
  children,
  onclose,
  isOpen,
  showClosetBtn = true,
  size = "lg",
  classnames = "",
}: {
  children: any;
  onclose?: any;
  isOpen: any;
  showClosetBtn?: boolean;
  size?: any;
  classnames?: any;
}) => {
  return (
    <Modal
      centered
      opened={isOpen}
      onClose={onclose}
      withCloseButton={showClosetBtn}
      closeOnClickOutside={showClosetBtn}
      closeOnEscape={showClosetBtn}
      size={size}
      overflow="inside"
      overlayColor="#fafafa"
      overlayOpacity={1}
      trapFocus={true}
      closeButtonLabel="Close modal"
    >
      <div className={`eb-modal-content_container ${classnames}`}>
        {children}
      </div>
    </Modal>
  );
};
