using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Portfolio.API.Data;
using Portfolio.API.Data.Entity;
using Portfolio.API.ViewModel;

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

        public ContactMessage Add(ContactMessageViewModel vm, string remoteAddress)
        {
            ValidateContactMessage(vm);

            ContactMessage toAdd = new ContactMessage()
            {
                Name = vm.Name,
                Email = vm.Email,
                Message = vm.Message,
                RemoteAddress = remoteAddress
            };

            _dataContext.ContactMessages.Add(toAdd);
            _dataContext.SaveChanges();

            return toAdd;
        }

        protected void ValidateContactMessage(ContactMessageViewModel vm)
        {
            if (null == vm)
            {
                throw new ArgumentNullException(nameof(vm));
            }

            if (string.IsNullOrWhiteSpace(vm.Name))
            {
                throw new ManagerException("Name cannot be empty!");
            }

            if (string.IsNullOrWhiteSpace(vm.Email))
            {
                throw new ManagerException("Email cannot be empty!");
            }

            if (string.IsNullOrWhiteSpace(vm.Message))
            {
                throw new ManagerException("Message cannot be empty!");
            }

            if (vm.Name.Length > ContactMessage.PropertyNameMaxLength)
            {
                throw new ManagerException("Name exceeds maximum length!");
            }

            if (vm.Email.Length > ContactMessage.PropertyEmailMaxLength)
            {
                throw new ManagerException("Email exceeds maximum length!");
            }

            if (vm.Message.Length > ContactMessage.PropertyMessageMaxLength)
            {
                throw new ManagerException("Message exceeds maximum length!");
            }
        }

    }
}
