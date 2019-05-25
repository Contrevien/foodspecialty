using FoodSpecialityDataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace FoodSpecialityDataAccessLayer
{
    public class FSRepository
    {
        FoodSpecialityContext _context;

        public FSRepository(FoodSpecialityContext context)
        {
            _context = context;
        }

        #region Users
        public Users GetDefault()
        {
            try
            {
                var user = _context.Users.FirstOrDefault();
                return user;
            }
            catch (Exception e)
            {
                return null;
            }

        }

        public List<Users> GetPendingQueriesUser()
        {
            try
            {
                return (from u in _context.Users
                        where u.Query != null && u.Response.StartsWith('A')
                        select u).ToList();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Orders GetNotDeliveredForUser(string id)
        {
            try
            {
                return (from o in _context.Orders
                        where o.Uid == id && o.DelStatus != "DA" && o.DelStatus != "RA"
                        select o).FirstOrDefault();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Users GetUser(string userName)
        {
            try
            {
                var user = (from usr in _context.Users
                            where usr.Email == userName
                            select usr).FirstOrDefault();
                return user;
            }
            catch (Exception e)
            {
                return null;
            }

        }

        public Users GetUserById(string userName)
        {
            try
            {
                var user = (from usr in _context.Users
                            where usr.Uid == userName
                            select usr).FirstOrDefault();
                return user;
            }
            catch (Exception e)
            {
                return null;
            }

        }

        public string GetNextUserId()
        {
            string last = "";
            try
            {
                last = _context.Users.OrderBy(u => u.Uid).Select(u => u.Uid).LastOrDefault();
                last = "U" + (Convert.ToInt32(last.Substring(1)) + 1).ToString();
            }
            catch (Exception)
            {
                last = "";
            }
            return last;
        }

        public bool AddUser(Users user)
        {
            bool status = false;
            try
            {
                _context.Users.Add(user);
                _context.SaveChanges();
                status = true;
            }
            catch (Exception ex)
            {
                status = false;
            }
            return status;
        }

        public bool UpdateUser(Users user)
        {
            bool status = false;
            Users found = _context.Users.Find(user.Uid);
            try
            {
                if (found != null)
                {
                    found.Name = user.Name;
                    found.Email = user.Email;
                    found.Password = user.Password;
                    found.Phone = user.Phone;
                    found.Address = user.Address;
                    found.Query = user.Query;
                    found.Response = user.Response;
                    found.Status = user.Status;
                    _context.SaveChanges();
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        } 
        #endregion

        #region Vendor
        public Vendors GetVendorByDefault()
        {
            try
            {
                var vend = _context.Vendors.FirstOrDefault();
                return vend;
            }
            catch (Exception e)
            {
                return null;
            }

        }

        public List<Vendors> GetPendingQueriesVendor()
        {
            try
            {
                return (from u in _context.Vendors
                        where u.Query != null && u.Response.StartsWith('A')
                        select u).ToList();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public string GetNextVendorId()
        {
            string last = "";
            try
            {
                last = _context.Vendors.OrderBy(u => u.Vid).Select(u => u.Vid).LastOrDefault();
                last = "V" + (Convert.ToInt32(last.Substring(1)) + 1).ToString();
            }
            catch (Exception)
            {
                last = "";
            }
            return last;
        }

        public Vendors GetVendorById(string id)
        {
            try
            {
                var user = (from usr in _context.Vendors
                            where usr.Vid == id
                            select usr).FirstOrDefault();
                return user;
            }
            catch (Exception e)
            {
                return null;
            }

        }

        public Vendors GetVendor(string userName)
        {
            try
            {
                var user = (from usr in _context.Vendors
                            where usr.Email == userName
                            select usr).FirstOrDefault();
                return user;
            }
            catch (Exception e)
            {
                return null;
            }

        }


        public bool AddVendors(Vendors vendor)
        {
            bool status = false;
            try
            {
                _context.Vendors.Add(vendor);
                _context.SaveChanges();
                status = true;
            }
            catch (Exception ex)
            {
                status = false;
            }
            return status;
        }

        public bool UpdateVendor(Vendors user)
        {
            bool status = false;
            Vendors found = _context.Vendors.Find(user.Vid);
            try
            {
                if (found != null)
                {
                    found.Name = user.Name;
                    found.Email = user.Email;
                    found.Password = user.Password;
                    found.Phone = user.Phone;
                    found.Address = user.Address;
                    found.AccountInfo = user.AccountInfo;
                    found.Query = user.Query;
                    found.Response = user.Response;
                    found.Status = user.Status;
                    _context.SaveChanges();
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        public List<Orders> GetInProgressForVendor(string id)
        {
            try
            {
                return (from o in _context.Orders
                        where o.Vid == id && o.DelStatus != "D" && o.DelStatus != "DA" && o.DelStatus != "R" && o.DelStatus != "RA"
                        select o).ToList();
            }
            catch (Exception)
            {
                return null;
            }
        }

        #endregion

        #region Dishes
        public List<Dishes> GetAllDishes()
        {
            try
            {
                var dishesList = _context.Dishes.ToList();
                return dishesList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public List<Dishes> GetAllDishesByVendor(string Vid)
        {
            try
            {
                var dishesList = _context.Dishes.Where(d => d.Vid == Vid).ToList();
                return dishesList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public string GetNextDishId()
        {
            string last = "";
            try
            {
                last = _context.Dishes.OrderBy(u => u.Did).Select(u => u.Did).LastOrDefault();
                last = "D" + (Convert.ToInt32(last.Substring(1)) + 1).ToString();
            }
            catch (Exception)
            {
                last = "";
            }
            return last;
        }
        public bool AddDish(Dishes dish)
        {
            bool status = false;
            try
            {
                _context.Dishes.Add(dish);
                _context.SaveChanges();
                status = true;
            }
            catch (Exception ex)
            {
                status = false;
            }
            return status;
        }

        public Dishes GetDish(string dishId)
        {
            try
            {
                var dish = (from dish1 in _context.Dishes
                            where dish1.Did == dishId
                            select dish1).FirstOrDefault();
                return dish;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public bool UpdateDish(Dishes dish)
        {
            bool status = false;
            Dishes found = _context.Dishes.Find(dish.Did);
            try
            {
                if (found != null)
                {
                    found.Name = dish.Name;
                    found.Status = dish.Status;
                    found.CatId = dish.CatId;
                    found.Description = dish.Description;
                    found.Price = dish.Price;
                    _context.SaveChanges();
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        public bool DeleteDish(string dishId)
        {
            Dishes dish = null;
            bool status = false;
            try
            {
                dish = _context.Dishes.Find(dishId);
                if (dish != null)
                {
                    _context.Dishes.Remove(dish);
                    _context.SaveChanges();
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }
        #endregion

        #region Category
        public List<Category> GetAllCategories()
        {
            try
            {
                var dishesList = _context.Category.ToList();
                return dishesList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public Category GetCategoryById(string id)
        {
            try
            {
                var user = (from usr in _context.Category
                            where usr.CatId == id
                            select usr).FirstOrDefault();
                return user;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public string GetNextCategoryId()
        {
            string last = "";
            try
            {
                last = _context.Category.OrderBy(u => u.CatId).Select(u => u.CatId).LastOrDefault();
                last = "C" + (Convert.ToInt32(last.Substring(1)) + 1).ToString();
            }
            catch (Exception)
            {
                last = "";
            }
            return last;
        }

        public bool AddCategory(Category user)
        {
            bool status = false;
            try
            {
                _context.Category.Add(user);
                _context.SaveChanges();
                status = true;
            }
            catch (Exception ex)
            {
                status = false;
            }
            return status;
        }

        #endregion 

        #region Orders
        public List<Orders> GetAllOrders()
        {
            try
            {
                var order = _context.Orders.ToList();
                return order;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public string GetNextOrderId()
        {
            string last = "";
            try
            {
                last = _context.Orders.OrderBy(u => u.Oid).Select(u => u.Oid).LastOrDefault();
                last = "O" + (Convert.ToInt32(last.Substring(1)) + 1).ToString();
            }
            catch (Exception)
            {
                last = "";
            }
            return last;
        }
        public Orders GetOrderById(string orderId)
        {
            try
            {
                var order = (from odr in _context.Orders
                             where odr.Oid == orderId
                             select odr).FirstOrDefault();
                return order;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public List<Orders> GetOrdersByDid(string orderId)
        {
            try
            {
                var order = (from odr in _context.Orders
                             where odr.Did == orderId
                             select odr).ToList();
                return order;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public List<Orders> GetOrdersByUid(string orderId)
        {
            try
            {
                var order = (from odr in _context.Orders
                             where odr.Uid == orderId
                             select odr).ToList();
                return order;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public List<Orders> GetOrdersByVid(string orderId)
        {
            try
            {
                var order = (from odr in _context.Orders
                             where odr.Vid == orderId
                             select odr).ToList();
                return order;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public bool AddOrder(Orders order)
        {
            bool status = false;
            try
            {
                _context.Orders.Add(order);
                _context.SaveChanges();
                status = true;
            }
            catch (Exception ex)
            {
                status = false;
            }
            return status;
        }

        public bool DeleteOrder(string orderId)
        {
            Orders order = null;
            bool status = false;
            try
            {
                order = _context.Orders.Find(orderId);
                if (order != null)
                {
                    _context.Orders.Remove(order);
                    _context.SaveChanges();
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        public bool UpdateOrder(Orders order)
        {
            bool status = false;
            Orders found = _context.Orders.Find(order.Oid);
            try
            {
                if (found != null)
                {
                    found.Vid = order.Vid;
                    found.Uid = order.Uid;
                    found.Did = order.Did;
                    found.Quantity = order.Quantity;
                    found.DelStatus = order.DelStatus;
                    found.OrderTime = order.OrderTime;
                    _context.SaveChanges();
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }
        #endregion

        #region Payments
        public List<Payments> GetAllPayment()
        {
            try
            {
                var payment = _context.Payments.ToList();
                return payment;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public string GetNextPaymentId()
        {
            string last = "";
            try
            {
                last = _context.Payments.OrderBy(u => u.Pid).Select(u => u.Pid).LastOrDefault();
                last = "P" + (Convert.ToInt32(last.Substring(1)) + 1).ToString();
            }
            catch (Exception)
            {
                last = "";
            }
            return last;
        }

        public Payments GetPaymentById(string payId)
        {
            try
            {
                var paymnet = (from pmt in _context.Payments
                               where pmt.Pid == payId
                               select pmt).FirstOrDefault();
                return paymnet;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public bool AddPayment(Payments paymnet)
        {
            bool status = false;
            try
            {
                _context.Payments.Add(paymnet);
                _context.SaveChanges();
                status = true;
            }
            catch (Exception ex)
            {
                status = false;
            }
            return status;
        }

        public bool DeletePayment(string pmtId)
        {
            Payments payment = null;
            bool status = false;
            try
            {
                payment = _context.Payments.Find(pmtId);
                if (payment != null)
                {
                    _context.Payments.Remove(payment);
                    _context.SaveChanges();
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }
        #endregion

        #region Ratings
        public List<Ratings> GetRatingsByDid(string did)
        {
            try
            {
                return _context.Ratings.Where(r => r.Did == did).ToList();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public bool AddRating(Ratings rating)
        {
            bool status = false;
            try
            {
                _context.Ratings.Add(rating);
                _context.SaveChanges();
                status = true;
            }
            catch (Exception ex)
            {
                status = false;
            }
            return status;
        }

        public string GetNextRatingId()
        {
            string last = "";
            try
            {
                last = _context.Ratings.OrderBy(u => u.Rid).Select(u => u.Rid).LastOrDefault();
                last = "R" + (Convert.ToInt32(last.Substring(1)) + 1).ToString();
            }
            catch (Exception)
            {
                last = "";
            }
            return last;
        }

        public decimal GetAvgRating(string did)
        {
            try
            {
                List<Ratings> ratings = new List<Ratings>();
                ratings = _context.Ratings.Where(r => r.Did == did).ToList();
                int result = 0;
                foreach (var item in ratings)
                {
                    result += Convert.ToInt32(item.Rating);
                }
                return Convert.ToDecimal(result) / ratings.Count;
            }
            catch (Exception)
            {
                return -1;
            }
        }
        #endregion
    } 
}
