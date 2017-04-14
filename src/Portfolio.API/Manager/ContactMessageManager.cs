using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Portfolio.API.Data;
using Portfolio.API.Data.Entity;

namespace Portfolio.API.Manager
{
    public class ContactMessageManager
    {

        private readonly DataContext _dataContext;

        public ContactMessageManager(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public IEnumerable<ContactMessage> Get()
        {
            return _dataContext.ContactMessages;
        }

        public ContactMessage Get(long id)
        {
            return _dataContext.ContactMessages.FirstOrDefault(x => x.Id == id);
        }

        public ContactMessage Add(ContactMessage toAdd)
        {
            if (null == toAdd)
            {
                throw new ArgumentNullException(nameof(toAdd));
            }

            if (string.IsNullOrWhiteSpace(toAdd.Name))
            {
                throw new ManagerException("Name cannot be empty!");
            }

            if (string.IsNullOrWhiteSpace(toAdd.Email))
            {
                throw new ManagerException("Email cannot be empty!");
            }

            if (string.IsNullOrWhiteSpace(toAdd.Message))
            {
                throw new ManagerException("Message cannot be empty!");
            }

            if (toAdd.Name.Length > ContactMessage.PropertyNameMaxLength)
            {
                throw new ManagerException("Name exceeds maximum length!");
            }

            if (toAdd.Email.Length > ContactMessage.PropertyEmailMaxLength)
            {
                throw new ManagerException("Email exceeds maximum length!");
            }

            if (toAdd.Message.Length > ContactMessage.PropertyMessageMaxLength)
            {
                throw new ManagerException("Message exceeds maximum length!");
            }

            toAdd.CreateDate = DateTime.Now;
            toAdd.UpdateDate = DateTime.Now;
            toAdd.Id = default(long);

            _dataContext.ContactMessages.Add(toAdd);
            _dataContext.SaveChanges();

            return toAdd;
        }

    }
}
