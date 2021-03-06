import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Pagination from 'material-ui-flat-pagination';
import uuidv4 from 'uuid/v4';

const CustomizedListItem = props => {
  const onEditClick = () => {
    props.redirectToEdit(props.user.id);
  };

  const onDeleteClick = () => {
    props.performDelete(props.user.id);
  };

  return (
    <ListItem key={props.uuid}>
      <ListItemAvatar>
        <Avatar alt={'Avatar'} src={props.user.avatar} />
      </ListItemAvatar>
      <ListItemText
        primary={props.user.last_name}
        secondary={props.user.first_name}
      />
      <ListItemSecondaryAction>
        <IconButton aria-label="EDIT" onClick={onEditClick}>
          <EditIcon className="material-icons" />
        </IconButton>
        <IconButton aria-label="DELETE" onClick={onDeleteClick}>
          <DeleteIcon className="material-icons" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

CustomizedListItem.propTypes = {
  user: PropTypes.object.isRequired,
  uuid: PropTypes.string.isRequired,
  redirectToEdit: PropTypes.func.isRequired,
  performDelete: PropTypes.func.isRequired,
};

const ListWithPagination = props => {
  const onPageClick = (e, offset, page) => {
    props.performPageChange(offset, page);
  };

  return (
    <div>
      <List>
        {props.users.data.map(user => (
          <CustomizedListItem
            uuid={uuidv4()}
            user={user}
            redirectToEdit={props.redirectToEdit}
            performDelete={props.performDelete}
          />
        ))}
      </List>
      <hr className={'custom-hr'} />
      <div>
        <Pagination
          limit={props.users.per_page}
          offset={props.pagination.offset}
          total={props.users.total}
          classes={{ root: 'custom-pagination' }}
          onClick={onPageClick}
        />
      </div>
    </div>
  );
};

ListWithPagination.propTypes = {
  users: PropTypes.object.isRequired,
  performPageChange: PropTypes.func.isRequired,
  redirectToEdit: PropTypes.func.isRequired,
  performDelete: PropTypes.func.isRequired,
};

export default ListWithPagination;
