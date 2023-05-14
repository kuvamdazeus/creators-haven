import { Modal } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function NewPostModal({ isOpen, setIsOpen }: Props) {
  return (
    <Modal
      className=""
      width="50vw"
      blur
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <section className="p-5 text-left">
        <p>ksjhdfjkshdf</p>
      </section>
    </Modal>
  );
}
