import { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import useItemLogic from "./Item.logic";
import { IItem } from '../../models/Item';

interface IItemProps {
    item: IItem;
}

const ItemEdit = ({item} : IItemProps) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { handleEdit } = useItemLogic(item);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      handleEdit(values.title, values.subtitle, values.author_name, values.publish_year);
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <Button onClick={showModal}>
        Изменить
      </Button>
      <Modal title="Изменить информацию" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} cancelText="Отмена" okText="Готово">
        <Form layout='vertical' form={form} initialValues={{ 
          title: item.title, 
          subtitle: item.subtitle, 
          author_name: item.author_name?.join(', '), 
          publish_year: item.publish_year?.join(', ') 
          }}>
            <Form.Item label="Название" name="title">
                <Input />
            </Form.Item>
            <Form.Item label="Подзаголовок" name="subtitle">
                <Input />
            </Form.Item>
            <Form.Item label="Авторы" name="author_name">
                <Input />
            </Form.Item>
            <Form.Item label="Годы публикации" name="publish_year">
                <Input />
            </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ItemEdit;