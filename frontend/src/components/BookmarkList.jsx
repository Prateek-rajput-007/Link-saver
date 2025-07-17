// // // import { useState } from 'react';
// // // import axios from 'axios';
// // // import BookmarkCard from './BookmarkCard';

// // // function BookmarkList({ bookmarks, setBookmarks }) {
// // //   const [draggedId, setDraggedId] = useState(null);

// // //   const handleDragStart = (e, id) => {
// // //     setDraggedId(id);
// // //     e.dataTransfer.setData('text/plain', id);
// // //   };

// // //   const handleDragOver = (e) => {
// // //     e.preventDefault();
// // //   };

// // //   const handleDrop = async (e, dropId) => {
// // //     e.preventDefault();
// // //     if (draggedId === dropId) return;

// // //     const newBookmarks = [...bookmarks];
// // //     const draggedIndex = newBookmarks.findIndex((b) => b._id === draggedId);
// // //     const dropIndex = newBookmarks.findIndex((b) => b._id === dropId);
// // //     const [draggedBookmark] = newBookmarks.splice(draggedIndex, 1);
// // //     newBookmarks.splice(dropIndex, 0, draggedBookmark);

// // //     setBookmarks(newBookmarks);

// // //     try {
// // //       await axios.put(
// // //         'http://localhost:5000/api/bookmarks/order',
// // //         { bookmarks: newBookmarks.map((b, index) => ({ _id: b._id, order: index })) },
// // //         { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
// // //       );
// // //     } catch (error) {
// // //       console.error('Error updating bookmark order:', error.response?.data?.message || error.message);
// // //       alert('Failed to update bookmark order');
// // //     }
// // //   };

// // //   const handleDelete = (id) => {
// // //     setBookmarks(bookmarks.filter((bookmark) => bookmark._id !== id));
// // //   };

// // //   return (
// // //     <div className="mt-6">
// // //       {bookmarks.length === 0 ? (
// // //         <p className="text-gray-500 dark:text-gray-400">No bookmarks yet.</p>
// // //       ) : (
// // //         bookmarks.map((bookmark) => (
// // //           <BookmarkCard
// // //             key={bookmark._id}
// // //             bookmark={bookmark}
// // //             onDelete={handleDelete}
// // //             onDragStart={handleDragStart}
// // //             onDragOver={handleDragOver}
// // //             onDrop={handleDrop}
// // //           />
// // //         ))
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default BookmarkList;

// // import { useContext } from 'react';
// // import axios from 'axios';
// // import BookmarkCard from './BookmarkCard';
// // import ThemeContext from '../context/ThemeContext';

// // function BookmarkList({ bookmarks, setBookmarks }) {
// //   const { theme } = useContext(ThemeContext);

// //   const handleDelete = (id) => {
// //     setBookmarks(bookmarks.filter((bookmark) => bookmark._id !== id));
// //   };

// //   const handleDragStart = (e, id) => {
// //     e.dataTransfer.setData('text/plain', id);
// //   };

// //   const handleDragOver = (e) => {
// //     e.preventDefault();
// //   };

// //   const handleDrop = async (e, dropId) => {
// //     e.preventDefault();
// //     const draggedId = e.dataTransfer.getData('text/plain');
// //     if (draggedId === dropId) return;

// //     const newBookmarks = [...bookmarks];
// //     const draggedIndex = newBookmarks.findIndex((b) => b._id === draggedId);
// //     const dropIndex = newBookmarks.findIndex((b) => b._id === dropId);
// //     const [draggedBookmark] = newBookmarks.splice(draggedIndex, 1);
// //     newBookmarks.splice(dropIndex, 0, draggedBookmark);

// //     setBookmarks(newBookmarks);

// //     try {
// //       await axios.put(
// //         'http://localhost:5000/api/bookmarks/order',
// //         { bookmarks: newBookmarks.map((b, index) => ({ _id: b._id, order: index })) },
// //         { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
// //       );
// //     } catch (error) {
// //       console.error('Error updating bookmark order:', error.response?.data?.message || error.message);
// //       alert('Failed to update bookmark order');
// //     }
// //   };

// //   const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
// //   const headerColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-800';
// //   const emptyTextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

// //   return (
// //     <div className={`${cardBg} p-6 rounded-lg shadow-md transition-colors duration-300`}>
// //       <h2 className={`text-xl font-bold ${headerColor} mb-4`}>Bookmarks</h2>
// //       {bookmarks.length === 0 ? (
// //         <p className={`${emptyTextColor}`}>No bookmarks yet.</p>
// //       ) : (
// //         <div className="space-y-4">
// //           {bookmarks.map((bookmark) => (
// //             <BookmarkCard
// //               key={bookmark._id}
// //               bookmark={bookmark}
// //               onDelete={handleDelete}
// //               onDragStart={handleDragStart}
// //               onDragOver={handleDragOver}
// //               onDrop={handleDrop}
// //             />
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default BookmarkList;


// import { useContext } from 'react';
// import axios from 'axios';
// import BookmarkCard from './BookmarkCard';
// import ThemeContext from '../context/ThemeContext';

// function BookmarkList({ bookmarks, setBookmarks }) {
//   const { theme } = useContext(ThemeContext);

//   const handleDelete = (id) => {
//     setBookmarks(bookmarks.filter((bookmark) => bookmark._id !== id));
//   };

//   const handleDragStart = (e, id) => {
//     e.dataTransfer.setData('text/plain', id);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleDrop = async (e, dropId) => {
//     e.preventDefault();
//     const draggedId = e.dataTransfer.getData('text/plain');
//     if (draggedId === dropId) return;

//     const newBookmarks = [...bookmarks];
//     const draggedIndex = newBookmarks.findIndex((b) => b._id === draggedId);
//     const dropIndex = newBookmarks.findIndex((b) => b._id === dropId);
//     const [draggedBookmark] = newBookmarks.splice(draggedIndex, 1);
//     newBookmarks.splice(dropIndex, 0, draggedBookmark);

//     setBookmarks(newBookmarks);

//     try {
//       await axios.put(
//         'http://localhost:5000/api/bookmarks/order',
//         { bookmarks: newBookmarks.map((b, index) => ({ _id: b._id, order: index })) },
//         { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
//       );
//     } catch (error) {
//       console.error('Error updating bookmark order:', error.response?.data?.message || error.message);
//       alert('Failed to update bookmark order');
//     }
//   };

//   const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
//   const headerColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-800';
//   const emptyTextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

//   return (
//     <div className={`${cardBg} p-6 rounded-lg shadow-md transition-colors duration-300`}>
//       <h2 className={`text-xl font-bold ${headerColor} mb-4`}>Bookmarks</h2>
//       {bookmarks.length === 0 ? (
//         <p className={`${emptyTextColor}`}>No bookmarks yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {bookmarks.map((bookmark) => (
//             <BookmarkCard
//               key={bookmark._id}
//               bookmark={bookmark}
//               onDelete={handleDelete}
//               onDragStart={handleDragStart}
//               onDragOver={handleDragOver}
//               onDrop={handleDrop}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default BookmarkList;

import { useState } from 'react';
import axios from 'axios';
import { useDrag, useDrop } from 'react-dnd';

function BookmarkItem({ bookmark, index, moveBookmark, onDelete }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'BOOKMARK',
    item: { id: bookmark._id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'BOOKMARK',
    hover: (item) => {
      if (item.index !== index) {
        moveBookmark(item.index, index);
        item.index = index;
      }
    },
  });

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/bookmarks/${bookmark._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      onDelete(bookmark._id);
    } catch (error) {
      console.error('Error deleting bookmark:', error.response?.data?.message || error.message);
      alert('Failed to delete bookmark: ' + (error.response?.data?.message || 'Please try again'));
    }
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4 ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center">
        <img src={bookmark.favicon} alt="favicon" className="w-6 h-6 mr-3" onError={(e) => (e.target.src = '/default-favicon.png')} />
        <div>
          <a href={bookmark.url} target="_blank" className="text-blue-500 hover:underline">{bookmark.title}</a>
          <p className="text-sm text-gray-600 dark:text-gray-300">{bookmark.summary}</p>
          <div className="flex gap-2 mt-2">
            {bookmark.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{tag}</span>
            ))}
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="ml-auto text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function BookmarkList({ bookmarks, setBookmarks }) {
  const [tagFilter, setTagFilter] = useState('');

  const moveBookmark = async (fromIndex, toIndex) => {
    const updatedBookmarks = [...bookmarks];
    const [movedBookmark] = updatedBookmarks.splice(fromIndex, 1);
    updatedBookmarks.splice(toIndex, 0, movedBookmark);
    setBookmarks(updatedBookmarks);

    try {
      await axios.put(
        'http://localhost:5000/api/bookmarks/order',
        { bookmarks: updatedBookmarks },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
    } catch (error) {
      console.error('Error updating order:', error.response?.data?.message || error.message);
      alert('Failed to update order: ' + (error.response?.data?.message || 'Please try again'));
    }
  };

  const filteredBookmarks = tagFilter
    ? bookmarks.filter((bookmark) => bookmark.tags.includes(tagFilter))
    : bookmarks;

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Filter by Tag</label>
        <input
          type="text"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          placeholder="Enter tag to filter"
        />
      </div>
      <div>
        {filteredBookmarks.map((bookmark, index) => (
          <BookmarkItem
            key={bookmark._id}
            bookmark={bookmark}
            index={index}
            moveBookmark={moveBookmark}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default BookmarkList;